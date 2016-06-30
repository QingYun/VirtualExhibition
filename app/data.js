const test_data = [
  {
    "src": "./pic/1_entrance.jpg",
    "width": 4096,
    "height": 2048,
    "widgets": [
      {
        "type": "portal",
        "src": "./pic/up_arrow.png",
        "pos": {
          "x": 2500,
          "y": 1500,
          "angle": 0
        },
        "to": 1
      },
      {
        "type": "portal",
        "src": "./pic/up_arrow.png",
        "pos": {
          "x": 1500,
          "y": 1500,
          "angle": 90
        },
        "to": 1
      }
    ]
  },
  {
    "src": "./pic/2_timeline.jpg",
    "width": 4096,
    "height": 2048,
    "widgets": [
      {
        "type": "portal",
        "pos": {
          "x": 2500,
          "y": 1500,
          "angle": 0
        },
        "to": 2
      }
    ]
  },
  {
    "src": "./pic/3_mapofaus.jpg",
    "width": 4096,
    "height": 2048,
    "widgets": [
      {
        "type": "portal",
        "src": "./pic/up_arrow.png",
        "pos": {
          "x": 2500,
          "y": 1500,
          "angle": 90
        },
        "to": 3
      },
      {
        "type": "image",
        "src": "pic/play.png",
        "size": { width: 64, height: 64 },
        "pos": { x: 1090, y: 1010 },
        "action": {
          "name": "play-video",
          "payload": {
            "sources": [
              { "src": "./videos/sintel.mp4", "type": "video/mp4" },
              { "src": "./videos/sintel.gov", "type": "video/ogv" }
            ]
          }
        }
      }
    ]
  },
  {
    "src": "./pic/4_sitting.jpg",
    "width": 4096,
    "height": 2048,
    "widgets": [
      {
        "type": "portal",
        "src": "./pic/up_arrow.png",
        "pos": {
          "x": 2500,
          "y": 1500,
          "angle": 90
        },
        "to": 4
      }
    ]
  },
  {
    "src": "./pic/5_NTIprograms.jpg",
    "width": 4096,
    "height": 2048,
    "widgets": [
      {
        "type": "portal",
        "src": "./pic/up_arrow.png",
        "pos": {
          "x": 2500,
          "y": 1500,
          "angle": 60
        },
        "to": 5
      }
    ]
  },
  {
    "src": "./pic/6_lifeHsing.jpg",
    "width": 4096,
    "height": 2048,
    "widgets": [
      {
        "type": "portal",
        "src": "./pic/up_arrow.png",
        "pos": {
          "x": 2500,
          "y": 1500,
          "angle": 35
        },
        "to": 6
      }
    ]
  },
  {
    "src": "./pic/7_lifept2.jpg",
    "width": 4096,
    "height": 2048,
    "widgets": [
      {
        "type": "portal",
        "src": "./pic/up_arrow.png",
        "pos": {
          "x": 2500,
          "y": 1500,
          "angle": 35
        },
        "to": 7
      }
    ]
  },
  {
    "src": "./pic/8_calligraphy.jpg",
    "width": 4096,
    "height": 2048,
    "widgets": [
      {
        "type": "transparent",
        "polygon": [[2290, 1240], [2685, 1240], [2140, 1360], [2830, 1360]],
        "action": {
          "name": "iframe",
          "payload": {
            "url": "./Calligraphy/main.html",
          }
        }
      },
      {
        "type": "transparent",
        "polygon": [[2230, 940], [2485, 940], [2290, 1180], [2485, 1180]],
        "action": {
          "name": "new-tab",
          "payload": {
            "url": "./wish tree/index.html",
          }
        }
      }
    ]
  },
]

export default test_data;
