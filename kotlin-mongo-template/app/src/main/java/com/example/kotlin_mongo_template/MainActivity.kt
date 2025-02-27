package com.example.kotlin_mongo_template

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.datadog.android.Datadog
import com.datadog.android.DatadogSite
import com.datadog.android.privacy.TrackingConsent
import com.datadog.android.rum.RumConfiguration
import com.datadog.android.core.configuration.Configuration
import com.datadog.android.rum.Rum
import com.datadog.android.rum.tracking.ActivityViewTrackingStrategy
import com.datadog.android.sessionreplay.SessionReplay
import com.datadog.android.sessionreplay.SessionReplayConfiguration

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val clientToken = "pubd3d440a66b79296aeed333f755d22aa0"
        val environmentName = "production"
        val appVariantName = "test_variant"

        val configuration = Configuration.Builder(
            clientToken = clientToken,
            env = environmentName,
            variant = appVariantName
        )
            .useSite(DatadogSite.US1)
            .build()
        Datadog.initialize(this, configuration, TrackingConsent.GRANTED)

        val applicationId = "d67d88ed-cee5-4054-81ba-c4ca517d0eb1"
        val durationThreshold = 100L
        val rumConfiguration = RumConfiguration.Builder(applicationId)
            .trackUserInteractions()
            .trackLongTasks(durationThreshold)
            .useViewTrackingStrategy(ActivityViewTrackingStrategy(trackExtras = true))
            .build()
        Rum.enable(rumConfiguration)

        val sessionReplayConfig = SessionReplayConfiguration.Builder(100.0F)
         // in case you need Material extension support
            //.addExtensionSupport(MaterialExtensionSupport())
            // in case you need Jetpack Compose support
            //.addExtensionSupport(ComposeExtensionSupport)
            .build()
        SessionReplay.enable(sessionReplayConfig)
   

        setContentView(R.layout.activity_main)

        val button = findViewById<Button>(R.id.btnGoToSecond)
        button.setOnClickListener {
            val intent = Intent(this, SecondActivity::class.java)
            startActivity(intent)
        }
    }
}
