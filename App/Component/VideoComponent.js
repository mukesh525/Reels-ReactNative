import React, { useContext, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { AppContext } from '../Context';
import CommonStyle from '../Theme/CommonStyle';
import { width } from '../Utils/Constant';
import { VolumeButton } from './AppButton';

const styles = StyleSheet.create({
  videoView: {
    width,
    opacity: 1,
  },
  videoOuter: {
    width,
    ...CommonStyle.center,
  },
});

const VideoComponent = ({ post, isVisible, isNext }) => {
  const { displayHeight } = useContext(AppContext);
  const { isMute } = useContext(AppContext);
  const videoRef = useRef(null);
  const { url, url_ } = post;
  const { videoOuter, videoView } = styles;

  useEffect(() => {
    if (!isVisible && isNext && videoRef) {
      // videoRef.current.seek(0);
    }
  }, [isVisible, isNext]);

  const videoError = error => {
    // Manage error here
    console.log(error)
  };

  return (
    <View style={[videoOuter, { height: displayHeight }]}>

      {/* <Video
        source={{ uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1' }}
        style={{ width: 300, height: 300 }}
        controls={false}
      //ref={videoRef}
      /> */}


      <Video
        ref={videoRef}
        fullscreenAutorotate={true}
        // source={url}
        //source={{ uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4' }}
        source={{
          uri: url_,
          type: "application/x-mpegurl"
        }}
        autoPlay={true}
        repeat={true}
        onError={videoError}
        resizeMode={'cover'}
        muted={(!isVisible && true) || isMute}
        style={[videoView, { height: displayHeight }]}
        playInBackground={false}
        paused={!isVisible}
        ignoreSilentSwitch={'ignore'}
      />
      <VolumeButton />
    </View>
  );
};

export { VideoComponent };
