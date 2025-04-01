import SwiftUI
import DatadogRUM
import DatadogCrashReporting

struct AdditionalRUMView: View {
    @Environment(\.presentationMode) var presentationMode

    var body: some View {
        VStack {
            Button("Go Back") {
                presentationMode.wrappedValue.dismiss()
            }
            .padding()
            
            Button("Trigger Error Log") {
                //print("Clicked Error Button")
                fatalError("This is a test crash")
            }
            .padding()
        }
        .navigationTitle("Additional RUM Functionality")
        .trackRUMView(name: "Additional RUM View")
    }
}
