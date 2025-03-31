First, I ran the following commands to run a release build:
- iOS
```
flutter build ios --split-debug-info=./debug-info --obfuscate                                                       
```
- Android
```
flutter build apk --split-debug-info=./debug-info --obfuscate                                                       
```
Then, I ran the following with the `datadog-ci` tool to upload source maps:
```
datadog-ci flutter-symbols upload --service-name flutter_mongo_template --dart-symbols-location ./debug-info --android-mapping --ios-dsyms
```
