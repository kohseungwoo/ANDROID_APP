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
      withModuleName: "TB_ANDROID_APP", // React Native 모듈 이름
      initialProperties: nil,
      launchOptions: launchOptions
    )

    RNBootSplash.initWithStoryboard("BootSplash", rootView: rootView)

    let rootViewController = UIViewController()
    rootViewController.view = rootView

    self.window = UIWindow(frame: UIScreen.main.bounds)
    self.window?.rootViewController = rootViewController
    self.window?.makeKeyAndVisible()

    // 앱 상태 변화 감지 (스냅샷용 오버레이 추가)
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

    // 저장된 아이콘 상태로 복원
    restoreAppIconIfNeeded()

    return true
  }

  @objc func appWillResignActive() {
    guard let window = self.window else { return }

    let overlay = UIView(frame: window.bounds)
    overlay.backgroundColor = .white
    overlay.tag = 999

    let imageView = UIImageView(image: UIImage(named: "logo"))
    imageView.contentMode = .scaleAspectFit

    let imageSize: CGFloat = 200
    imageView.frame = CGRect(
      x: (overlay.bounds.width - imageSize) / 2,
      y: (overlay.bounds.height - imageSize) / 2,
      width: imageSize,
      height: imageSize
    )

    overlay.addSubview(imageView)
    window.addSubview(overlay)
    window.bringSubviewToFront(overlay)

    self.screenshotOverlay = overlay
  }

  @objc func appDidBecomeActive() {
    self.screenshotOverlay?.removeFromSuperview()
    self.screenshotOverlay = nil
  }


  // MARK: - 앱 아이콘 변경 관련 메서드

  /// 앱 아이콘을 변경하는 함수
  func changeAppIcon(to iconName: String?) {
    // 이미 같은 아이콘이면 변경하지 않음
    if UIApplication.shared.alternateIconName == iconName {
      print("이미 선택된 아이콘입니다.")
      return
    }

    UIApplication.shared.setAlternateIconName(iconName) { error in
      if let error = error {
        print("아이콘 변경 실패: \(error.localizedDescription)")
      } else {
        print("\(iconName ?? "기본아이콘") 아이콘으로 변경 성공")
        // UserDefaults에 저장
        UserDefaults.standard.set(iconName, forKey: "SelectedAppIcon")
      }
    }
  }

  /// 저장된 아이콘 상태를 불러와 앱 시작 시 아이콘 복원
  func restoreAppIconIfNeeded() {
    let savedIcon = UserDefaults.standard.string(forKey: "SelectedAppIcon")
    if UIApplication.shared.alternateIconName != savedIcon {
      UIApplication.shared.setAlternateIconName(savedIcon, completionHandler: nil)
    }
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
