//
//  ios_swift_mongo_templateApp.swift
//  ios-swift-mongo-template
//
//  Created by Nick Ramsay on 1/4/2025.
//

import SwiftUI
import DatadogCore
import DatadogRUM
import DatadogCrashReporting


let appID = "eda26649-20ab-4e99-83d2-b1a2d76eede3"
let clientToken = "pubb220cddf820733ea62461f6883f4a76e"
let environment = "staging"

@main
struct ios_swift_mongo_templateApp: App {
    
    init() {
            setupDatadog()
        }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
    private func setupDatadog() {
        
        Datadog.initialize(
            with: Datadog.Configuration(
                clientToken: clientToken,
                env: environment,
                site: .us1,
                service: "ios-swift-mongo-template"
            ),
            trackingConsent: .granted
        )
        
        CrashReporting.enable()

        RUM.enable(
            with: RUM.Configuration(
                applicationID: appID,
                uiKitViewsPredicate: DefaultUIKitRUMViewsPredicate(),
                uiKitActionsPredicate: DefaultUIKitRUMActionsPredicate()
            )
        )
        
        
    }
}
