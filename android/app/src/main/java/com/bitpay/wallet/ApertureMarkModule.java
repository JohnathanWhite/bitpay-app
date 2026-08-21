package com.bitpay.wallet;

import android.app.Activity;
import android.util.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Emits Aperture startup marks to logcat.
 *
 * `console.log` is stripped from release by babel-plugin-transform-remove-console,
 * so JS cannot reach logcat in release on its own — this native bridge can.
 * `android.util.Log.i` stamps the line on the same clock as every other logcat
 * line (and as ActivityManager's `Displayed`), which is exactly what Aperture
 * reads. The module only emits: no state, no network, no timers, no init work.
 */
public class ApertureMarkModule extends ReactContextBaseJavaModule {
    public ApertureMarkModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ApertureMark";
    }

    /**
     * Emit one pre-formatted mark line. JS builds the `ApertureMark|1|{json}`
     * string; native does exactly this one log write and nothing else.
     */
    @ReactMethod
    public void emit(String line) {
        Log.i("ApertureMark", line);
    }

    /**
     * Tell the platform the app is now fully drawn. Best-effort and never fatal:
     * no current activity, or an OEM that throws, must not crash the app.
     */
    @ReactMethod
    public void reportFullyDrawn() {
        Activity activity = getCurrentActivity();
        if (activity == null) {
            return;
        }
        try {
            activity.reportFullyDrawn();
        } catch (Throwable ignored) {
            // reportFullyDrawn() can throw on some OEM builds; it is a hint, not a guarantee.
        }
    }
}
