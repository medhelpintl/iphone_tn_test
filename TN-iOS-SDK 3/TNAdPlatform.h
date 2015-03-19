//
//  TNAdPlatform.h
//  TNAdPlatform
//
//  Created by SQCENG5 on 11/12/13.
//  Copyright (c) 2013 SQCENG5. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AdGear.h"

@interface TNAdControl : NSObject

@property (nonatomic, assign) BOOL debugLog;

+ (TNAdControl *)sharedControl;

- (NSDictionary *)libConfig;

/**
 Clears your global states associated to all you spots
 */
- (void)clearGlobalStates;

/**
 Set a targeting parameter on this Ad to be sent to the Ad Delivery platform.
 @param parameter The parameter to set
 @param value The value of the parameter
 */
- (void)setGlobalTargetingParameter:(NSString *)parameter withValue:(NSString *)value;

/**
 Remove a targeting parameter from this Ad.
 @param parameter The parameter to removed
 */
- (void)removeGlobalTargetingParameter:(NSString *)parameter;

@end


@protocol TNSpotViewAgent;


@interface TNSpotView : UIView

// The object acting as this spot view's delegate.
@property (nonatomic, weak) NSObject<TNSpotViewAgent> *agent;

// Wether ot not the spot view loaded an ad.
@property (readonly, assign) BOOL adLoaded;

// Wether or not the spot view is loading an ad.
@property (readonly, assign) BOOL adLoading;

// The spotView  unique identifier.
@property (nonatomic, retain) NSString *spotId;

// The format (size) of this spot view.
@property (nonatomic, assign) CGSize spotFormat;

// htmlPayload is a html string to load in.
@property (nonatomic, retain) NSString *htmlPayload;

// Webview the ad is displayed in
@property (nonatomic, readonly) UIWebView *adWebView;

// Wether or not the spot view is calling impression automatically.
@property (nonatomic, assign) BOOL preventImpressionCall;


- (id)initWithFormat:(CGSize)format adId:(NSString*)AdId isGeolocated:(BOOL)geolocationMode __attribute__ ((deprecated));

/**
 Initialize an TNSpotView with a size and geolocalization.
 @param format is the size to use for this view.
 @param spotId is the unique identifier in AdGear.
 @param geolocationMode set to TRUE enable to call the location before requesting ad. If parameter is set to FALSE, then geolocation is ignored
 @return Initialized instance of TNSpotView.
 */
- (id)initWithFormat:(CGSize)format spotId:(NSString*)spotId isGeolocated:(BOOL)geolocationMode;

/**
 Initialize an TNSpotView with a jsonString and geolocalization.
 @param format is the size to use for this view.
 @param jsonString is preloaded json for the ad.
 @param geolocationMode set to TRUE enable to call the location before requesting ad. If parameter is set to FALSE, then geolocation is ignored
 @return Initialized instance of TNSpotView.
 */
- (id)initWithFormat:(CGSize)format jsonString:(NSString*)jsonString isGeolocated:(BOOL)geolocationMode;

/**
 Initialize an TNSpotView with a jsonString and geolocalization.
 @param format is the size to use for this view.
 @param urlString is a url string to load json for the ad.
 @param geolocationMode set to TRUE enable to call the location before requesting ad. If parameter is set to FALSE, then geolocation is ignored
 @return Initialized instance of TNSpotView.
 */
- (id)initWithFormat:(CGSize)format urlString:(NSString*)urlString isGeolocated:(BOOL)geolocationMode;

/**
 Initialize an TNSpotView with a replicaSpotName and editionName from cach.
 @param frame is the frame to use for this view.
 @param spotName is the spot name in the cache.
 @param editionName is the edition name the spot cached for.
 @return Initialized instance of TNSpotView.
 */
- (id)initWithFrame:(CGRect)frame replicaSpotName:(NSString*)spotName andEditionName:(NSString*)editionName;

/**
 Initialize an TNSpotView with a adUnitId for preview.
 @param frame is the frame to use for this view.
 @param adUnitId is the spot id in the cache.
 @return Initialized instance of TNSpotView.
 */

- (id)initWithFrame:(CGRect)frame andPreviewAdUnitId:(NSString*)adUnitId;
/**
 Common setup function, it is used in post-init phase.
 @param AdId is the unique identifier in AdGear.
 @param islocalized Tset to TRUE enable to call the location before requesting ad. If parameter is set to FALSE, then geolocation is ignored.
 */
- (void)commonSetup:(NSString*)spotId isGeolocated:(BOOL)islocalized;

/**
 S Shortcut method to set the origin of this spotView.
 */
- (void)setOrigin:(CGPoint)point;

/**
 Shortcut method to set the size of this spotView.
 */
- (void)setSize:(CGSize)size;

/**
 Initialize the timer and send the first json request.
 */
- (void)startUpdate;

/**
 Sends a request to register an impression
 */
- (void)registerImpression;

/**
 Method to set and Enable a Timer on the spot to refresh the view.
 @param updateInterval is a time interval in second to trigger the re call for a new JSON ad request. If autoUpdateInterval is set to 0 then the timer is disabled. Else the minimum value to trigger the timer is set to 10 seconds. When the app goes in Background it is recommended to set the updateInterval to zero to diseable timer
 */
- (void)setAutoUpdateInterval:(NSInteger)updateInterval;

/**
 Set a targeting parameter on this Ad to be sent to the Ad Delivery platform.
 @param parameter The parameter to set
 @param value The value of the parameter
 */
- (void)setLocalTargetingParameter:(NSString *)parameter withValue:(id)value;

/**
 Remove a targeting parameter from this Ad.
 @param parameter The parameter to removed
 */
- (void)removeLocalTargetingParameter:(NSString *)parameter;

/**
 Remove TNSpotView from super view
 */
- (void)cleanSubview;

/**
 Closes expanded ad without animation
 */
- (void)closeExpanded;

/**
 Returns dictionary of ad declared click urls
 */
- (NSDictionary*)adDeclaredClickUrls;

/**
 Returns dictionary of ad click tracker urls
 */
- (NSDictionary*)adClickTrackerUrls;

/**
 Returns dictionary of ad interaction tracker urls
 */
- (NSDictionary*)adInteractionTrackerUrls;

/**
 Returns dictionary of ad variables
 */
- (NSDictionary*)adVariables;

/**
 Returns dictionary of ad file urls
 */
- (NSDictionary*)adFileUrls;

/**
 Calls urlString
 */
- (void)callTrackerUrl:(NSString*)urlString;

/**
 Used to aid mraid isViewable() method.
 Set YES if ad is on-screen and viewable by the user
 Set NO ad is off-screen and not viewable
 */
- (void)adViewDisplayed:(BOOL)displayed;

@end



/**
 Set of methods to implement to act as a delegate to an TNSpotView.
 */
@protocol TNSpotViewAgent <NSObject>

@optional

/**
 Callback invoked when a spot view loaded an Ad.
 @param spotView The TNSpotView that just loaded an Ad.
 */
- (void)spotViewDidLoad:(TNSpotView *)spotView;

/**
 Callback invoked when a spot view fails to load an Ad.
 @param spotView The TNSpotView that just failed to load an Ad.
 @param error The error encountered by the underlying UIWebView.
 */
- (void)spotViewDidFailToLoad:(TNSpotView *)spotView withError:(NSError *)error;

/**
 Callback invoked when a spot view fails to receive an Ad.
 @param spotView The TNSpotView that just failed to receive an Ad.
 @param error The error encountered by ...
 */
- (void)spotViewDidFailToReceiveAd:(TNSpotView *)spotView withError:(NSError *)error;

/**
 Invoked by the spot view before opening it's action view to see wether or not the action view should be opened. You can also use this opportunity to close active tasks in your application to give more device resources to the action clickthrough.
 @param spotView The TNSpotView that is requesting to open it's action view.
 */
- (BOOL)spotViewActionShouldOpen:(TNSpotView *)spotView;

/**
 Callback invoked when the spot view's action view was closed, either by the user or manually by the view.
 */
- (void)spotViewActionDidFinish:(TNSpotView *)spotView;

/**
 @brief Delegate funtion call After download the metadata, i.e. JSON.
 @param jsonString is a string representation of the metadata.
 @param placementId is id of the placement
 @param adunitId is id of the adunit
 @param campaignId is id of the campaign
 */
- (void)spotViewDidGetMetadata:(NSString*)jsonString placement:(NSString*)placementId adunit:(NSString*)adunitId campaign:(NSString*)campaignId;

/**
 @brief Delegate funtion call before TNSpotView will load url
 Return value: YES if the TNSpotView should begin loading url; otherwise, NO.
 @param spotView
 @param url
 */
- (BOOL)spotView:(TNSpotView *)spotView shouldStartLoadURL:(NSURL *)url __attribute__ ((deprecated));

/**
 @brief Delegate funtion call before TNSpotView will load url
 Return value: YES if the TNSpotView should begin loading url; otherwise, NO.
 @param spotView
 @param url
 @param navigationType
 */
- (BOOL)spotView:(TNSpotView *)spotView shouldStartLoadURL:(NSURL *)url navigationType:(UIWebViewNavigationType)navigationType;

/**
 @brief Delegate funtion call when TNSpotView calls regEvent command
 @param spotView
 @param name
 @param url
 */
- (void)spotView:(TNSpotView *)spotView didCallRegEventWithName:(NSString *)name andUrl:(NSString *)url;

/**
 @brief Delegate function call when TNSpotView calls RegregisterImpression
 @param spotView
 */
- (void)spotViewDidCallRegregisterImpression:(TNSpotView *)spotView;

/**
 Allows the application to override the phone call process to, for example display an alert to the user before hand.
 @param number the phone number to call.
 */
- (void)placePhoneCall:(NSString *)number;

/**
 Email isn't setup on the device, let the app decide what to do
 */
- (void)emailNotSetupForAd:(TNSpotView *)adView;

/**
 @brief Delegate function call to request current view's UIViewController. Used to push new UIViewController to the navigation stack (for example to present web browser controller).
 Return value: UIViewController of the current view
 */
- (UIViewController*)spotViewController;

/**
 Callback invoked when spot view removed itself from superview.
 @param spotView The TNSpotView that just removed itself.
 */
- (void)spotViewDidRemoveItselfFromSuperView:(TNSpotView *)spotView;

// Called just before an ad expands
- (void)willExpandAd:(TNSpotView *)spotView;

// Called just after an ad expands
- (void)didExpandAd:(TNSpotView *)spotView;

// Called just before an ad closes
- (void)adWillClose:(TNSpotView *)spotView;

// Called just after an ad closes
- (void)adDidClose:(TNSpotView *)spotView;

@end