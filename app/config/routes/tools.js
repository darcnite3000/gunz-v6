import React from 'react';
import {
  CampaignManager,

  Links,
  LinkingCodes,
  URLShortener,

  Banners,
  GeneralBanners,
  VideoBanners,

  IFrame,
  AutoBanners,
  ThumbnailGallery,
  
  Feeds,
  
  Galleries,
  GalleryExport,
  HostedGalleries,
  
  Trailers,
  MultiAppVideo,
  TrailerPlayer,
  TubeExport,

  ZippedContent,
} from '../../components/pages/tools/tools';
import { Webmaster, Tools } from '../../components/pages/pages';

import {Router, Route, DefaultRoute} from 'react-router';


import {createDefaultRedirect} from '../../components/annotations/annotations';

export default (
<Route name="webmaster" handler={Webmaster}>
  <DefaultRoute name="webmaster-tools" handler={Tools} />
  <Route name="campaign" handler={CampaignManager} />
  <Route name="links" handler={Links}>
    <Route name="linking-code" handler={LinkingCodes} />
    <Route name="url-shortener" handler={URLShortener} />
    <DefaultRoute handler={createDefaultRedirect('linking-code')} />
  </Route>
  <Route name="banners" handler={Banners}>
    <Route name="general-banners" handler={GeneralBanners} />
    <Route name="video-banners" handler={VideoBanners} />
    <DefaultRoute handler={createDefaultRedirect('general-banners')} />
  </Route>
  <Route name="feeds" handler={Feeds} />
  <Route name="iframe" handler={IFrame}>
    <Route name="auto-update-banners" handler={AutoBanners} />
    <Route name="thumbnail-gallery" handler={ThumbnailGallery} />
    <DefaultRoute handler={createDefaultRedirect('auto-update-banners')} />
  </Route>
  <Route name="galleries" handler={Galleries}>
    <Route name="hosted-galleries" handler={HostedGalleries} />
    <Route name="gallery-export" handler={GalleryExport} />
    <DefaultRoute handler={createDefaultRedirect('hosted-galleries')} />
  </Route>
  <Route name="trailers" handler={Trailers}>
    <Route name="multi-app-video" handler={MultiAppVideo} />
    <Route name="trailer-player" handler={TrailerPlayer} />
    <Route name="tube-export" handler={TubeExport} />
    <DefaultRoute handler={createDefaultRedirect('multi-app-video')} />
  </Route>
  <Route name="zipped" handler={ZippedContent} />
</Route>
);