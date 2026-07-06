package app.harbor

import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.Gravity
import android.webkit.WebView
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge

class MainActivity : TauriActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    if (!isWebViewAvailable() || !canCreateWebView()) {
      showMissingWebViewScreen()
      return
    }
    enableEdgeToEdge()
    super.onCreate(savedInstanceState)
  }

  private fun showMissingWebViewScreen() {
    Log.e(TAG, "WebView provider missing or broken; aborting native create")
    Toast.makeText(
      this,
      "WebView provider is missing on this device.",
      Toast.LENGTH_LONG,
    ).show()
    val view = TextView(this).apply {
      text = "WebView provider is missing on this device.\n\nHarbor requires Android System WebView or a compatible Chrome WebView provider."
      textSize = 16f
      setPadding(40, 40, 40, 40)
      gravity = Gravity.CENTER
    }
    setContentView(view)
  }

  private fun isWebViewAvailable(): Boolean {
    return try {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        val pkg = WebView.getCurrentWebViewPackage()
        if (pkg == null) {
          Log.e(TAG, "WebView package missing (getCurrentWebViewPackage is null)")
          false
        } else {
          Log.i(TAG, "WebView package: ${pkg.packageName} ${pkg.versionName}")
          true
        }
      } else {
        @Suppress("DEPRECATION")
        packageManager.getPackageInfo("com.google.android.webview", 0)
        true
      }
    } catch (_: Exception) {
      false
    }
  }

  private fun canCreateWebView(): Boolean {
    return try {
      val webView = WebView(this)
      webView.destroy()
      true
    } catch (e: Exception) {
      Log.e(TAG, "WebView init failed", e)
      false
    }
  }

  private companion object {
    const val TAG = "HarborWebView"
  }
}
