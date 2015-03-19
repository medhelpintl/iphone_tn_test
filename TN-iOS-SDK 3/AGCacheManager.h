//
//  AGCacheManager.h
//  tn-ios-sdk
//
//  Created by Boulat on 2012-09-13.
//  Copyright (c) 2012 AdGear. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface AGCacheManager : NSObject <NSURLConnectionDelegate>

@property (nonatomic, strong) NSString *agDirPath;
@property (nonatomic, strong) NSString *agDbDirPath;
@property (nonatomic, strong) NSString *agDbFilePath;
@property (nonatomic, strong) NSString *agTmpBundlePath;
@property (nonatomic, strong) NSString *agWebRootDirPath;

+ (AGCacheManager*)sharedInstance;
- (void)processAdsBundle:(NSString*)srcPath forEditionName:(NSString*)editionName withCompletion:(void (^)(BOOL success))completion;
- (void)processPreviewBundle:(NSString*)srcPath withCompletion:(void (^)(BOOL success))completion;
- (void)flushAllAdsWithCompletion:(void (^)(void))completion;
- (void)flushAdsForEditionName:(NSString*)editionName withCompletion:(void (^)(void))completion;
- (void)fetchJsonStringForReplicaSpotName:(NSString*)spotName editionName:(NSString*)editionName withCompletion:(void (^)(NSString *jsonString))completion;
- (void)fetchJsonStringForPreviewAdUnitId:(NSString*)adUnitId withCompletion:(void (^)(NSString *jsonString))completion;
- (void)addUrlToQueue:(NSString*)url withCompletion:(void (^)(BOOL success))completion;
@end
