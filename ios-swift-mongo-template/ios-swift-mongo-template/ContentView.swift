//
//  ContentView.swift
//  ios-swift-mongo-template
//
//  Created by Nick Ramsay on 1/4/2025.
//

import SwiftUI
import DatadogRUM
import DatadogCrashReporting


struct ContentView: View {
    var body: some View {
        NavigationStack {
                   VStack {
                       NavigationLink("Open Additional RUM Functionality", destination: AdditionalRUMView())
                           .padding()
                       Button("Trigger Error Log") {
                           //print("Clicked Error Button")
                           let crash: String? = nil
                           print(crash!)
                       }
                       .padding()
                   }
                   .navigationTitle("iOS Swift Mongo Template")
               }
        .trackRUMView(name: "Home View")
    }
}

#Preview {
    ContentView()
}
