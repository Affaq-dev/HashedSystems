from PIL import Image
C="/Users/stellteck/.claude/image-cache/1c0289e3-d9c6-40d4-bde8-d0e3f9ee6f83/"
def lines(n,S,X0,YT,y0,y1,x0,x1,label,thr=300,light=False):
    im=Image.open(C+n+".png").convert("RGB")
    if light: pred=lambda p: sum(p)>720
    else: pred=lambda p: sum(p)<thr
    rows={}
    for y in range(y0,y1):
        xs=[x for x in range(x0,x1) if pred(im.getpixel((x,y)))]
        if xs: rows[y]=(min(xs),max(xs))
    if not rows: print(label,"NONE"); return
    ys=sorted(rows); grp=[];cur=[ys[0]]
    for y in ys[1:]:
        if y-cur[-1]>2: grp.append(cur); cur=[y]
        else: cur.append(y)
    grp.append(cur)
    print(label)
    for L in grp:
        xa=min(rows[y][0] for y in L); xb=max(rows[y][1] for y in L)
        print(f"   y {round((L[0]-YT)/S,1)}-{round((L[-1]-YT)/S,1)} h={round((L[-1]-L[0]+1)/S,1)} x {round((xa-X0)/S,1)}..{round((xb-X0)/S,1)} w={round((xb-xa)/S,1)}")
    if len(grp)>1: print("   pitch:",[round((grp[i+1][0]-grp[i][0])/S,1) for i in range(len(grp)-1)])

# DESKTOP stat card 1 (white text on salmon) x 83..391 y 252..378 render
lines("15",1478/1440,0,0,255,380,90,385,"DESKTOP stat1 text",light=True)
lines("15",1478/1440,0,0,415,715,330,730,"DESKTOP testimonial1 text",thr=330)
# TABLET stat1: x 75..377*S, y 196..302 frame -> render x 95..476 y 251..384
lines("16",970/768,0,3,255,385,100,470,"TABLET stat1 text",light=True)
lines("16",970/768,0,3,570,790,250,470,"TABLET testimonial1 text",thr=330)
# MOBILE stat1: frame x14..181 y238..369 -> render x21..231 y302..467
lines("17",473/375,3,2,305,468,25,225,"MOBILE stat1 text",light=True)
lines("17",473/375,3,2,730,955,170,400,"MOBILE testimonial1 text",thr=330)
