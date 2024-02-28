import type { Schema, Attribute } from '@strapi/strapi';

export interface ActivityFile extends Schema.Component {
  collectionName: 'components_activity_files';
  info: {
    displayName: 'file';
    icon: 'file';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    material: Attribute.Media;
  };
}

export interface ActivityText extends Schema.Component {
  collectionName: 'components_activity_texts';
  info: {
    displayName: 'text';
    icon: 'underline';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
  };
}

export interface ActivityTopic extends Schema.Component {
  collectionName: 'components_activity_topics';
  info: {
    displayName: 'topic';
    icon: 'folder';
  };
  attributes: {
    name: Attribute.String;
  };
}

export interface ActivityVideo extends Schema.Component {
  collectionName: 'components_activity_videos';
  info: {
    displayName: 'video';
    icon: 'link';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    link: Attribute.String;
    videoFile: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'activity.file': ActivityFile;
      'activity.text': ActivityText;
      'activity.topic': ActivityTopic;
      'activity.video': ActivityVideo;
    }
  }
}
