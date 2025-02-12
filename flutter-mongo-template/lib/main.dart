import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:intl/intl.dart';
import 'dart:io';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:go_router/go_router.dart';
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';
import 'package:datadog_tracking_http_client/datadog_tracking_http_client.dart';

void main() async {
  await dotenv.load(fileName: ".env");

  final configuration = DatadogConfiguration(
    clientToken: dotenv.env['clientToken'].toString(),
    env: 'staging',
    site: DatadogSite.us1,
    nativeCrashReportEnabled: true,
    firstPartyHosts: ['localhost', '10.0.2.2'],
    loggingConfiguration: DatadogLoggingConfiguration(),
    rumConfiguration: DatadogRumConfiguration(
      applicationId: dotenv.env['applicationId'].toString(),
      traceSampleRate: 100.0,
      sessionSamplingRate: 100.0,
    ),
  );

  configuration.enableHttpTracking();

  void startApp = runApp(
    ChangeNotifierProvider(
      create: (_) => MessageProvider(),
      child: const MyApp(),
    ),
  );
  if (Platform.isAndroid || Platform.isIOS) {
    await DatadogSdk.runApp(configuration, TrackingConsent.granted, () async {
      startApp;
    });
  } else {
    startApp;
  }
}

final GoRouter _router = GoRouter(routes: <RouteBase>[
  GoRoute(
    path: '/',
    builder: (BuildContext context, GoRouterState state) {
      return MessageScreen();
    },
    routes: <RouteBase>[
      GoRoute(
        path: 'additionalRum',
        builder: (BuildContext context, GoRouterState state) {
          return const AdditionalRumFunctionality();
        },
      ),
    ],
  ),
], observers: [
  DatadogNavigationObserver(datadogSdk: DatadogSdk.instance),
]);

class MyApp extends StatelessWidget {
  /// Constructs a [MyApp]
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
      theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
            seedColor: const Color(0xffe83e8c),
            brightness: Brightness.dark,
          )),
    );
  }
}

class MessageScreen extends StatelessWidget {
  final TextEditingController _controller = TextEditingController();

  MessageScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<MessageProvider>(context);

    return RumUserActionDetector(
        rum: DatadogSdk.instance.rum,
        child: Scaffold(
          resizeToAvoidBottomInset: false,
          appBar: AppBar(title: const Text('Flutter MongoDB Template')),
          body: Column(
            children: [
              Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.only(top: 3.0, bottom: 3.0),
                    child: SizedBox(
                      height: 150,
                      child: Image.asset(
                        'images/flutterLogo.png',
                        fit: BoxFit.scaleDown,
                      ),
                    ),
                  ),
                ),
                Expanded(
                    child: Padding(
                  padding: const EdgeInsets.only(top: 3.0, bottom: 3.0),
                  child: SizedBox(
                    height: 100,
                    child: Image.asset(
                      'images/mongoDbLogo.png',
                      fit: BoxFit.scaleDown,
                    ),
                  ),
                )),
              ]),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _controller,
                        decoration: const InputDecoration(
                          labelText: 'Enter a message',
                          border: OutlineInputBorder(),
                        ),
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.send),
                      onPressed: () {
                        DateTime currentTimestamp = DateTime.now();
                        provider.addMessage(_controller.text, currentTimestamp);
                        _controller.clear();
                      },
                    ),
                  ],
                ),
              ),
              Expanded(
                child: provider.isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : ListView.builder(
                        itemCount: provider.messages.length,
                        itemBuilder: (context, index) {
                          final message = provider.messages[index];
                          return Card(
                              child: ListTile(
                            title: Text(message['message']),
                            subtitle: Text(DateFormat('d MMM y, hh:mm aaa')
                                .format(DateTime.parse(message['created_date'])
                                    .toLocal())),
                            trailing: IconButton(
                              icon: const Icon(Icons.delete),
                              onPressed: () {
                                provider.deleteMessage(message['_id']);
                              },
                            ),
                          ));
                        },
                      ),
              ),
              Container(
                  margin: const EdgeInsets.only(top: 10.0, bottom: 15.0),
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xffe83e8c).withOpacity(0.5),
                      foregroundColor: Colors.white,
                      elevation: 5,
                    ),
                    onPressed: () => context.go("/additionalRum"),
                    child: const Text('Additional RUM Functionality'),
                  )),
            ],
          ),
        ));
  }
}

class AdditionalRumFunctionality extends StatelessWidget {
  const AdditionalRumFunctionality({super.key});

  @override
  Widget build(BuildContext context) {
    return RumUserActionDetector(
        rum: DatadogSdk.instance.rum,
        child: Scaffold(
            appBar: AppBar(
              title: const Text('Additional RUM Functionality'),
            ),
            body: Column(children: [
              Center(
                child: ElevatedButton(
                  onPressed: () => context.go('/'),
                  child: const Text('Go back!'),
                ),
              ),
              Center(
                child: ElevatedButton(
                  onPressed: () => context.go('/'),
                  child: const Text('Go back!'),
                ),
              ),
            ])));
  }
}

class ImageSection extends StatelessWidget {
  const ImageSection({super.key, required this.image});

  final String image;

  @override
  Widget build(BuildContext context) {
    // #docregion image-asset
    return Image.asset(
      image,
      width: 120,
      height: 250,
      fit: BoxFit.cover,
    );
    // #enddocregion image-asset
  }
}

class MessageProvider extends ChangeNotifier {
  List<dynamic> messages = [];
  bool isLoading = false;

  final String baseUrl = kIsWeb
      ? 'http://localhost:3001/messages'
      : (Platform.isAndroid
          ? 'http://10.0.2.2:3001/messages'
          : 'http://localhost:3001/messages');

  Timer? _timer;

  MessageProvider() {
    fetchMessages(loadingStatus: true);
    _startAutoFetch();
  }

  void _startAutoFetch() {
    _timer = Timer.periodic(const Duration(seconds: 5), (timer) {
      fetchMessages(loadingStatus: false);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  Future<void> fetchMessages({bool? loadingStatus}) async {
    isLoading = loadingStatus as bool;
    notifyListeners();
    try {
      final response = await http.get(Uri.parse(baseUrl));
      messages = jsonDecode(response.body);
    } catch (error) {
      print('Error fetching messages: $error');
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  Future<void> addMessage(String message, DateTime currentTimestamp) async {
    try {
      await http.post(
        Uri.parse(baseUrl),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'message': message,
          'created_date': currentTimestamp.toIso8601String()
        }),
      );
      fetchMessages(loadingStatus: true);
    } catch (error) {
      print('Error adding message: $error');
    }
  }

  Future<void> deleteMessage(String id) async {
    try {
      await http.delete(Uri.parse('$baseUrl/$id'));
      fetchMessages(loadingStatus: true);
    } catch (error) {
      print('Error deleting message: $error');
    }
  }
}
