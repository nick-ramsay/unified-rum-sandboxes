package com.example.kotlin_mongo_template

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import com.datadog.android.webview.WebViewTracking

class WebViewActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_webview)

        webView = findViewById(R.id.webView)
        webView.settings.javaScriptEnabled = true
        webView.webViewClient = WebViewClient()
        WebViewTracking.enable(webView, listOf("https://react-mongo-template.herokuapp.com/"))
        webView.loadUrl("https://react-mongo-template.herokuapp.com/")

        // Handle system back button
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()  // Go back within WebView
                } else {
                    finish()  // Exit WebViewActivity and go back to SecondActivity
                }
            }
        })
    }
}
