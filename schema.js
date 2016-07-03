// scene
{
  id: Any,
  src: String,
  width: Integer,
  height: Integer,
  widgets: [Widget]
}

// widget 箭头
{
  type: 'portal',
  src: String,
  angle: Integer
  pos: { x: Integer, y: Integer }
  action: Action
}

// widget 图片
{
  type: 'image',
  src: String,
  size: { width: Integer, height: Integer },
  pos: { x: Integer, y: Integer },
  action: Action
}

// widget 文字
{
  type: 'text',
  text: String,
  pos: { x: Integer, y: Integer },
  style: {
    font_style: String,
    font_variant: String,
    font_weight: String,
    font_stretch: String,
    font_size: Integer,   // 18
    font_family: String,    // Arial
    border_weight: Integer,   // 4
    border_radius: Integer,   // 6
    backgroud_color: { r: Integer, g: Integer, b: Integer, a: Double}, // 255, 255, 255, 1
    text_color: { r: Integer, g: Integer, b: Integer, a: Double}, // 0, 0, 0, 1
    border_color: { r: Integer, g: Integer, b: Integer, a: Double}, // 0, 0, 0, 0
    text_padding: { left: Integer, right: Integer, bottom: Integer, top: Integer}  // 0, 0, 0, 0
  },
  action: Action
}

// widget 透明可点击区域
{
  type: 'transparent',
  polygon: [[Integer, Integer]]  // [[x, y]]
  action: Action
}

// Action
// action 跳转场景
{
  name: 'change-scene',
  payload: {
    destination: Any  // scene id
  }
}

// Action
// action 播放视频
{
  name: 'play-video',
  payload: {
    sources: [{src: String, type: String}]  // MIME type
  }
}

// Action
// action 内嵌网页
{
  name: 'iframe',
  payload: {
    url: String
  }
}

// Action
// action 以 target = _blank 打开链接
{
  name: 'new-tab',
  payload: {
    url: String
  }
}

{
  name: 'show-slider',
  payload: {
    slides: [{
      type: 'text',
      content: {
        header: String,
        subheader: String,
        paragraphs: [String]
      }
    } | {
      type: 'image',
      content: {
        src: String,
        caption: String,
        description: String
      }
    }]
  }
}
