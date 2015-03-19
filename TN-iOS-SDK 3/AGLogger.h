//
//  AGLoger.h
//  tn-ios-sdk
//
//  Created by Boulat on 2012-11-07.
//  Copyright (c) 2012 AdGear. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface AGLogger : NSObject

#if defined __cplusplus
extern "C" {
#endif
    
extern void AGLog(NSString *format, ...);

#if defined __cplusplus
};
#endif
    
@end
