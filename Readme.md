## Graphical Input
```
# Get all videos
{
  videos {
    title
  }
}

# Add new the video
mutation M {
  createVideo(title: "Bat", duration: 450, released: true) {
    id, 
    title
  }
}
```