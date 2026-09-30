# CSC Bir Sujra — Google AdSense Setup Guide

## Abhi website ka status
- AdSense code architecture add hai, lekin `enabled: false` hai.
- Localhost par ad-slot preview dikhega.
- Live website par approval/configuration se pehle koi blank ad box ya third-party ad request nahi jayegi.
- Legal/contact/404/Google Ads landing page par ads intentionally disabled hain.

## Approval ke baad
1. Google AdSense me `cscbirsujra.in` add karein.
2. Site approval complete hone dein.
3. AdSense > Ads > By ad unit me 5 responsive Display ad units banayein:
   - Home After Finder
   - Home Before Blog
   - Blog Index Middle
   - Article After Intro
   - Article Before Conclusion
4. Har ad unit ka numeric Slot ID note karein.
5. Publisher ID format `ca-pub-1234567890123456` note karein.
6. Website folder me PowerShell kholkar command run karein:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\setup-adsense.ps1 `
  -PublisherId "ca-pub-1234567890123456" `
  -HomeAfterFinder "1111111111" `
  -HomeBeforeBlog "2222222222" `
  -BlogIndexMiddle "3333333333" `
  -ArticleAfterIntro "4444444444" `
  -ArticleBeforeConclusion "5555555555"
```

Auto Ads ko code se nahi, AdSense dashboard me site settings se ON/OFF karein. Pehle manual units se start karna safer hai.

## Google CMP / consent
AdSense > Privacy & messaging me European regulations message create aur publish karein. EEA, UK aur Switzerland ke personalized ads ke liye Google-certified CMP required hai. Website ka normal custom banner certified CMP ka replacement nahi hai.

## ads.txt
Setup script root `ads.txt` ko real publisher line se update karega. Deployment ke baad browser me check karein:

`https://cscbirsujra.in/ads.txt`

## Important safety rules
- Khud apne ads par click na karein.
- Family/friends/customers ko ads click karne ke liye na bolein.
- Traffic exchange, paid-to-click, auto-surf, bots ya cheap invalid traffic use na karein.
- Ads ko WhatsApp, Call, menu, form, video play या download buttons ke paas move na karein.
- “Click ads to support us” jaisi line kabhi na likhein.
- Paid Google Ads campaign traffic ko ad-heavy article pages par arbitrage ke liye na bhejein.
- Publisher content ads se zyada aur useful hona chahiye.

## Recommended launch order
1. Domain + HTTPS live
2. Search Console + sitemap
3. Original shop photos and regular useful blog content
4. AdSense application
5. Site approval
6. CMP message publish
7. Script se Publisher/Slot IDs configure
8. ads.txt verify
9. Policy Center regularly check
