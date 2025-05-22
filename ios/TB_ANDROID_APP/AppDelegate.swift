import UIKit
import React
import RNBootSplash
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?
  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    // Set up factory and delegate
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    self.reactNativeDelegate = delegate
    self.reactNativeFactory = factory

    // Create rootView using rootViewFactory
    let rootView = factory.rootViewFactory.view(
      withModuleName: "TB_ANDROID_APP",
      initialProperties: nil,
      launchOptions: launchOptions
    )

    // Init BootSplash (after rootView creation)
    RNBootSplash.initWithStoryboard("BootSplash", rootView: rootView)

    // Assign rootView to a root view controller
    let rootViewController = UIViewController()
    rootViewController.view = rootView

    // Assign to window
    self.window = UIWindow(frame: UIScreen.main.bounds)
    self.window?.rootViewController = rootViewController
    self.window?.makeKeyAndVisible()

    return true
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    return self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
