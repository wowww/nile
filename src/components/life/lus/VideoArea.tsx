import cn from 'classnames';

const VideoArea = () => {
  return (
    <div className={cn('lus-video-wrap')}>
      <h3>Story of LUS264</h3>
      <div className={cn('video-wrap')}>
        <iframe src="https://www.youtube.com/embed/fIj7YLJMvKI" title="YouTube video player" height={'100%'} allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default VideoArea;
