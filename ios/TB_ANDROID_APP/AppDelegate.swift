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
  var screenshotOverlay: UIView?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    self.reactNativeDelegate = delegate
    self.reactNativeFactory = factory

    let rootView = factory.rootViewFactory.view(
      withModuleName: "TB_ANDROID_APP", // <-- React Native 모듈 이름에 맞게 변경
      initialProperties: nil,
      launchOptions: launchOptions
    )

    RNBootSplash.initWithStoryboard("BootSplash", rootView: rootView)

    let rootViewController = UIViewController()
    rootViewController.view = rootView

    self.window = UIWindow(frame: UIScreen.main.bounds)
    self.window?.rootViewController = rootViewController
    self.window?.makeKeyAndVisible()

    // 앱 상태 변화 감지 등록 (스냅샷 전에 오버레이 추가)
    NotificationCenter.default.addObserver(
      self,
      selector: #selector(appWillResignActive),
      name: UIApplication.willResignActiveNotification,
      object: nil
    )

    NotificationCenter.default.addObserver(
      self,
      selector: #selector(appDidBecomeActive),
      name: UIApplication.didBecomeActiveNotification,
      object: nil
    )

    return true
  }

  // 앱이 비활성화되기 직전에 오버레이 추가 (스냅샷 이전!)
  @objc func appWillResignActive() {
      guard let window = self.window else { return }

      let overlay = UIView(frame: window.bounds)
      overlay.backgroundColor = .white
      overlay.tag = 999

      // 1. 이미지 뷰 생성
      let imageView = UIImageView(image: UIImage(named: "logo"))
      imageView.contentMode = .scaleAspectFit

      // 2. 원하는 크기로 줄이기 (예: 200x200)
      let imageSize: CGFloat = 200
      imageView.frame = CGRect(
          x: (overlay.bounds.width - imageSize) / 2,
          y: (overlay.bounds.height - imageSize) / 2,
          width: imageSize,
          height: imageSize
      )

      // 3. 추가
      overlay.addSubview(imageView)
      window.addSubview(overlay)
      window.bringSubviewToFront(overlay)

      self.screenshotOverlay = overlay
  }


  // 앱이 다시 활성화되면 오버레이 제거
  @objc func appDidBecomeActive() {
    self.screenshotOverlay?.removeFromSuperview()
    self.screenshotOverlay = nil
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
