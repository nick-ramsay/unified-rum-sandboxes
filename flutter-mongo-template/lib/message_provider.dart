import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class MessageProvider with ChangeNotifier {
  List<String> _messages = [];

  List<String> get messages => _messages;

  final String _baseUrl = kIsWeb ? 'http://localhost:5000/messages':(Platform.isAndroid ? 'http://10.0.2.2:5000/messages':'http://localhost:5000/messages');

  Future<void> fetchMessages() async {
    final response = await http.get(Uri.parse('$_baseUrl/messages'));
    if (response.statusCode == 200) {
      final List data = json.decode(response.body);
      _messages = data.map((message) => message['message'] as String).toList();
      notifyListeners();
    }
  }

  Future<void> addMessage(String message, DateTime createdDate) async {
    print("Called addMessage controller");
    final response = await http.post(
      Uri.parse('$_baseUrl/messages'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'message': message, 'created_date': createdDate}),
    );
    if (response.statusCode == 201) {
      _messages.add(message);
      notifyListeners();
    }
  }

  Future<void> deleteMessage(int index) async {
    final id = _messages[index];
    final response = await http.delete(Uri.parse('$_baseUrl/messages/$id'));
    if (response.statusCode == 200) {
      _messages.removeAt(index);
      notifyListeners();
    }
  }
}
