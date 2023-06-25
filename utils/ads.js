import { useEffect, useState } from 'react';
import mobileAds, { AdEventType, InterstitialAd, MaxAdContentRating, TestIds } from 'react-native-google-mobile-ads';

export function loadAdsConfiguration() {
    mobileAds().setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,
        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,
        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
    }).then(() => {
        // Request config successfully set!
    });

    mobileAds().initialize().then(adapterStatuses => { });
}

export function loadIntersitial(ad, setAdLoaded) {


    const unsubscribe = ad.addAdEventListener(AdEventType.LOADED, (type) => {
        setAdLoaded(true);
    });

    // Start loading the interstitial straight away
    ad.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
}