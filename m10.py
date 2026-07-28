from PIL import Image
C="/Users/stellteck/.claude/image-cache/1c0289e3-d9c6-40d4-bde8-d0e3f9ee6f83/"
im=Image.open(C+"15.png").convert("RGB")
for i,x in enumerate([100,430,765,1100]):
    print(f"stat{i+1} fill",'#%02x%02x%02x'%im.getpixel((x,265)))
# label color: sample a dense glyph pixel in label row (y~330) of card1 and card4
def darkest(x0,x1,y0,y1,minimize=True):
    best=None
    for x in range(x0,x1):
        for y in range(y0,y1):
            p=im.getpixel((x,y)); s=sum(p)
            if best is None or (s>best[0] if minimize else s<best[0]): best=(s,p)
    return best
print("card1 label brightest",'#%02x%02x%02x'%darkest(130,330,321,337)[1])
print("card4 label darkest",'#%02x%02x%02x'%darkest(1130,1350,321,337,False)[1])
print("card1 value brightest",'#%02x%02x%02x'%darkest(180,281,278,306)[1])
print("stars sample",[('#%02x%02x%02x'%im.getpixel((x,630))) for x in range(355,440,8)])
im3=Image.open(C+"17.png").convert("RGB")
print("mobile stat fills",['#%02x%02x%02x'%im3.getpixel((x,y)) for x,y in [(40,320),(280,320),(40,500),(280,500)]])
