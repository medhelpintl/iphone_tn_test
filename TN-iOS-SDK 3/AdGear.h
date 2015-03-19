

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "AGCacheManager.h"

#define	TN_FORMAT_XX_Wide_Banner		CGSizeMake(320, 50)
#define	TN_FORMAT_X_Wide_Banner			CGSizeMake(300, 50)
#define	TN_FORMAT_XX_Medium_Rectangle	CGSizeMake(320, 250)
#define	TN_FORMAT_X_Medium_Rectangle	CGSizeMake(300, 250)
#define	TN_FORMAT_X_Leaderboard			CGSizeMake(728, 90)
#define	TN_FORMAT_XX_Leaderboard		CGSizeMake(1024, 90)
#define TN_FORMAT_X_Full_Page			CGSizeMake(320, 480)
#define TN_FORMAT_XX_Full_Page			CGSizeMake(1024, 768)



#define	AG_FORMAT_IAB_LEADERBOARD       CGSizeMake(728, 90)
#define	AG_FORMAT_IAB_BANNER            CGSizeMake(468, 60)
#define	AG_FORMAT_IAB_HALFBANNER        CGSizeMake(234, 60)
#define	AG_FORMAT_IAB_BUTTON            CGSizeMake(125, 125)
#define	AG_FORMAT_IAB_SKYSCRAPER        CGSizeMake(120, 600)
#define	AG_FORMAT_IAB_WIDESKYSCRAPER	CGSizeMake(160, 600)
#define	AG_FORMAT_IAB_SMALLRECTANGLE	CGSizeMake(180, 150)
#define	AG_FORMAT_IAB_VERTICALBANNER	CGSizeMake(120, 240)
#define	AG_FORMAT_IAB_SMALLSQUARE       CGSizeMake(200, 200)
#define	AG_FORMAT_IAB_SQUARE            CGSizeMake(250, 250)
#define	AG_FORMAT_IAB_MEDIUMRECTANGLE	CGSizeMake(300, 250)
#define	AG_FORMAT_IAB_LARGERECTANGLE	CGSizeMake(336, 280)
#define	AG_FORMAT_IAB_FULLBANNER        AG_FORMAT_IAB_BANNER
#define	AG_FORMAT_IAB_BIGBOX            AG_FORMAT_IAB_MEDIUMRECTANGLE

#define	AG_FORMAT_MMA_SMALL             CGSizeMake(120, 20)
#define	AG_FORMAT_MMA_SMALLHIGH         CGSizeMake(120, 30)
#define	AG_FORMAT_MMA_MEDIUM            CGSizeMake(168, 28)
#define	AG_FORMAT_MMA_MEDIUMHIGH        CGSizeMake(168, 42)
#define	AG_FORMAT_MMA_LARGE             CGSizeMake(216, 36)
#define	AG_FORMAT_MMA_LARGEHIGH         CGSizeMake(168, 42)
#define	AG_FORMAT_MMA_XLARGE            CGSizeMake(216, 54)
#define	AG_FORMAT_MMA_XLARGEHIGH        CGSizeMake(300, 75)
#define	AG_FORMAT_MMA_XXLARGE           CGSizeMake(320, 50)



#define AG_SDK_VERSION_VAL              @"3.11.2"
#define AG_SDK_BUILD_VAL                @"17db70ff5297e2762f5add7af236f019eb1318fb"

#define DEFAULT_REFRESH_TIME 45

#define TYPE_IMAGE                      @"MobileApp::MImage"
#define TYPE_THIRDPARTY                 @"MobileApp::MThirdParty"
#define TYPE_NATIVETHIRDPARTY           @"MobileApp::MNative-"
#define TYPE_CUSTOMJAVASCRIPT           @"MobileApp::MJavascript"
#define TYPE_TABLET_CUSTOMJAVASCRIPT    @"TabletApp::TJavascript"
#define TYPE_HTML5                      @"MobileApp::MHtml5"
#define TYPE_TABLET_HTML5               @"TabletApp::THtml5"

#define SERVER_PROTOCOL                 @"http://"
#define SERVER_PROTOCOL_SSL             @"https://"

#define AG_HOST                         @"AG_HOST"
#define AG_DEFAULT_HOST                 @"d.adgear.com"
#define DEFAULT_SERVER_ADRESS           AG_DEFAULT_HOST
#define SERVER_ADRESS                   @"SERVER_ADRESS"
#define SERVER_URL                      @"/impressions/int_nc/"

#define SERVER_SESSION_URL              @"/session"
#define SERVER_MOBILE_STATS_URL         @"/mobile_stats"
#define COOKIE_SESSION_NAME             @"AdGear_Session"
#define JSON_TEMPLATE                   @"template"

#define JSON_ENV                        @"env"
#define JSON_ASSET                      @"assets"
#define JSON_DELIVERY                   @"delivery"
#define JSON_HTTP                       @"http"
#define JSON_HTTPS                      @"https"
#define JSON_BUCKET                     @"bucket"
#define JSON_HOST                       @"hostname"
#define JSON_VARIABLES                  @"variables"
#define JSON_VARIABLES_FORMAT_HEIGHT    @"format_height"
#define JSON_VARIABLES_FORMAT_WIDTH     @"format_width"

#define JSON_THIRDPARTY_VARIABLE_URL    @"thirdparty_witness_url"
#define B64_RANDOM_STRING               @"__RANDOM_NUMBER__"

#define JSON_FILES                      @"files"
#define JSON_FILES_IMAGE                @"image"
#define JSON_FILES_HTML                 @"html_file"

#define JSON_CLICKS                     @"clicks"
#define JSON_CLICKS_TAG                 @"clickTAG"

#define JSON_IMPRESSION_TRACKER         @"impression_tracker"
#define JSON_CLICK_TRACKER              @"click_tracker"
#define JSON_BUNDLE_DOWNLOAD_TRACKER    @"download_tracker"

#define JSON_INTERACTIONS               @"interactions"

#define JSON_DECLARED_CLICK_URLS        @"declared_click_urls"

// Native Thrid Party
#define JSON_NETWORK_MODULE             @"network_module"
#define JSON_NETWORK_PARAM              @"network_params"
#define JSON_PAYLOAD                    @"payload"

#define USE_HTTPS                       @"USE_HTTPS"

#define PARAM_CHIP_KEY                  @"CHIP_KEY"
#define PARAM_AG_MOBILE_APP_CHIP_KEY    @"AG_MOBILE_APP_CHIP_KEY"
#define PARAM_AG_MOBILE_APP_ID          @"AG_MOBILE_APP_ID"
#define PARAM_AG_SESSID                 @"AG_SESSID"
#define PARAM_AG_LT                     @"AG_LT"
#define PARAM_AG_R                      @"AG_R"
#define PARAM_AG_IOSID                  @"AG_IOSID"
#define PARAM_AG_APP_NAME               @"AG_APP_NAME"
#define PARAM_AG_APP_VERSION            @"AG_APP_VERSION"
#define PARAM_AG_APP_BUNDLE_VERSION     @"AG_APP_BUNDLE_VERSION"
#define PARAM_AG_APP_ID                 @"AG_APP_ID"
#define PARAM_AG_SDK_VERSION            @"AG_SDK_VERSION"
#define PARAM_AG_SDK_BUILD              @"AG_SDK_BUILD"
#define PARAM_AG_SYSTEM_NAME            @"AG_SYSTEM_NAME"
#define PARAM_AG_SYSTEM_VERSION         @"AG_SYSTEM_VERSION"
#define PARAM_AG_DEVICE_MODEL           @"AG_DEVICE_MODEL"

#define NOTIFICATION_SESSION_MANAGER_IS_SET @"Session is Set"

#define TOKEN_PREFIX                    @"__AG"
#define TOKEN_SUFFIX                    @"__"
#define TOKEN_RANDOM_NUMBER             @"__AG_RANDOM_NUMBER__"

#define TOKEN_EVENT_TRACKING_JS         @"__AG_EVENT_TRACKING_JS__"
#define TOKEN_ORMMA_JS                  @"__AG_ORMMA_JS__"
#define TOKEN_MRAID_JS                  @"__AG_MRAID_JS__"
#define TOKEN_JQUERY_JS                 @"__AG_JQUERY_JS__"
#define TOKEN_JQUERY_JS_VAR             @"__AG_JQUERY_JS"
#define TOKEN_JS                        @"__AG_JS__"
#define TOKEN_CLICK_URL                 @"__AG_AD_CLICK_URL"
#define TOKEN_IACTION_URL               @"__AG_AD_IACTION_URL"
#define TOKEN_FILE_URL                  @"__AG_AD_FILE_URL"
#define TOKEN_VAR                       @"__AG_AD_VAR"

#define ORMMA_JS_INCLUDE                @"<script src=\"/ormma_bridge.js\" type=\"text/javascript\"></script><script src=\"/ormma.js\" type=\"text/javascript\"></script>"
#define JQUERY_JS_INCLUDE               @"<script type=\"text/javascript\">%@</script>"
#define AG_JS_INCLUDE                   @"<script type=\"text/javascript\">%@</script>"




@class AGAdNativeGenericAdapter;

/**
 Set of methods to implement to act as an AGAdNativeGenericAdapter delegate
 */
@protocol AGAdNativeGenericAdapterDelegate <NSObject>

@optional

/**
 @brief Callback invoked when a spot view uncessfully load an Native 3rdparty Ad.
 @param adapter The AGAdNativeGenericAdapter that just loaded Native 3rdparty  Ad.
 */
-(void)nativeAdapterDidFail:(AGAdNativeGenericAdapter*)adapter;

/**
 @brief  Callback invoked when a spot view loaded an Native 3rdparty Ad.
 @param adapter The AGAdNativeGenericAdapter that just loaded Native 3rdparty  Ad.
 */
-(void)nativeAdapterDidLoad:(AGAdNativeGenericAdapter*)adapter;

@end






/**
 The AGAdNativeGenericAdapter is a base class to be derivated by native thirdparty implementation.
 */
@interface AGAdNativeGenericAdapter : NSObject <AGAdNativeGenericAdapterDelegate>
{
    id<AGAdNativeGenericAdapterDelegate> delegate;
    NSString *networkCannonicalName;
    UIViewController *parentViewController;
    BOOL isLoaded;
}

/**
 The object acting as this AGAdNativeGenericAdapter's delegate.
 */
@property (nonatomic,assign) id delegate;
@property (nonatomic,retain) NSString *networkCannonicalName;
@property (nonatomic,retain) UIViewController *parentViewController;
@property (nonatomic,assign) BOOL isLoaded;

/**
 @brief Initialize NativeThirdParty network with cannonical name of the network.
 @param name is provided by the JSON.
 */
-(id)initWithName:(NSString*)name;

/**
 @brief Load and activate of the NativeThirdParty network ad. It should be activated only by the AGAdNativeThirdPartySelector.
 @param networkConfiguration is a dictionnary from network_variables on JSON files.
 @param masterView is a view  load native 3rdParty.
 @param nativeSpotSize is a Size of the native 3rd Party spot
 */
-(void)loadAdWithDict:(NSDictionary*)networkConfiguration  masterView:(UIView*)masterView size:(CGSize)nativeSpotSize;

/**
 @brief unload the NativeThirdParty network ad.
 */
-(void)unLoadAd;

@end






/**
 The AGAdNativeThirdPartySelector is a selector dispatcher between several native plugins.
 */
@interface AGAdNativeThirdPartySelector : NSObject
{
    //   NSMutableDictionary *dictonnaryOfSpot;
    NSMutableDictionary *dictonnaryOfAdaptor;
}

/**
 Dictionnary of networks ad adaptors .
 */
@property(nonatomic,retain) NSMutableDictionary *dictonnaryOfAdaptor;

/**
 @brief Singleton instantiation.
 */
+ (AGAdNativeThirdPartySelector*)sharedInstance;

/**
 @brief  Intialization of the NativeThirdParty supportt
 @param  networkCannonical is a string from the json to be make the dispatch on the right AgAdNative Object.
 @param  networkConfigDict is a dictionnary  from network_variables in json files..
 @param  localMasterView is reference to the spotView (is casted as UIview).
 @param  spotId is the unique identifier for spotView.
 @param  nativeSpotSize is size of the spot;
 */
-(void)activateNetwork:(NSString*)networkCannonical config:(NSDictionary*)networkConfigDict masterView:(UIView*)localMasterView withSpotId:(NSString*)spotId  size:(CGSize)nativeSpotSize;

/**
 @brief  unload Network on a Spot of the NativeThirdParty support
 @param  spotId is the unique identifier for SpotView.
 */
-(void)desActivateAllNetwork:(NSString*)spotId;

/**
 @brief  Initialization of the NativeThirdParty support.
 @param  networkAdpater is a string from the json to be make the dispatch on the right AgAdNative Object.
 @param  name is the unique  cannonical name of  network ad.
 @note   The recordNetwork should be called for each Network before recordSpot
 */
-(void)recordNetwork:(AGAdNativeGenericAdapter*)networkAdpater withName:(NSString*)name;

/**
 @brief  intialization of the NativeThirdParty support
 @param  spotId is the unique identifier for SpotView.
 */
-(void)recordSpot:(NSString*)spotId;

@end