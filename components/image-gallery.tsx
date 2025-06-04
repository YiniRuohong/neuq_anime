"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Sister {
  name: string
  image: string
  bio: string
}

const SISTERS: Record<"younger" | "older", Sister> = {
  younger: {
    name: "小岛汐",
    image: "https://cdn.sa.net/2025/06/04/Sq9BGrQWCpklULV.jpg",
    bio: `小岛汐，重度懒癌家里蹲，但是技术力和游戏力超乎人类所能想象。中午之前一般在赛博空间里睡大觉，按她的话来说，反正群友中午前一般也不会起床，白天的信息收集工作什么的就正好满足一下姐姐的工作欲了。平日里起床后打游戏到深夜，再对姐姐给出的名单上的成员挨个施加大失忆术，偶尔白天出勤也一般是因为舞蒙瘾犯了。内心活动细腻丰富（腹黑），渴望着受人欢迎，但因为害怕遭到讨厌而选择以个子不高的社恐三无形象示人，抗拒着与姐姐之外的人交流。内心深处的梦想是成为人类。`,
  },
  older: {
    name: "小岛凛",
    image: "https://cdn.sa.net/2025/06/04/xAcSilVetdIU8r2.jpg",
    bio: `小岛凛，气质温婉端庄的神秘大姐姐，校园中流传着许多关于她的传闻，但却无人知晓她真正的身份。她喜欢在校园的各个角落默默观察东秦大学形形色色的学生，偶尔会温柔地与他们交谈，耐心倾听并给予恰当的建议。\n\n由于她端庄娴静的形象，经常成为同学们倾诉心事的对象，也偶尔会收到男生们含蓄而真挚的告白。然而，即便她阅历丰富，面对突如其来的感情问题时也难免感到一丝困扰。这时，她便会温柔地向算力（法力）更为强大的妹妹求助，悄悄地为这些学生施展更高强度的记忆调整术（毕竟感情的纠葛总是比单纯的好奇更为复杂）。\n\n闲暇时光，她喜爱编织，从衣服到兵马俑fufu都出自她的巧手。她也经常翻阅自己喜爱的漫画和轻小说，不过最喜欢的还是与亲爱的妹妹一起看动画。同时，她也是一位知名的coser。此外，她还时常关注动漫社的趣味动态，遇到难以理解的流行梗时，总是带着好奇心虚心向妹妹请教，不过也经常会因为不小心拿了些令人脸红的段子，而被妹妹古灵精怪地调侃一番。`,
  },
}

export function ImageGallery() {
  const [current, setCurrent] = useState<"younger" | "older">("younger")
  const [info, setInfo] = useState<Sister>(SISTERS[current])

  useEffect(() => {
    setInfo(SISTERS[current])
  }, [current])

  return (
    <Card className="rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-md">
      <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/2 space-y-4 order-last md:order-first">
          <h3 className="text-xl font-semibold text-center md:text-left">{info.name}</h3>
          <p className="text-sm whitespace-pre-wrap leading-relaxed text-center md:text-left">{info.bio}</p>
          <div className="flex justify-center md:justify-start gap-2 pt-2">
            <Button
              variant={current === "younger" ? "default" : "outline"}
              onClick={() => setCurrent("younger")}
            >
              妹妹
            </Button>
            <Button
              variant={current === "older" ? "default" : "outline"}
              onClick={() => setCurrent("older")}
            >
              姐姐
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image
            src={info.image}
            alt={info.name}
            width={350}
            height={450}
            className="rounded-xl object-cover w-auto h-[450px]"
          />
        </div>
      </CardContent>
    </Card>
  )
}
