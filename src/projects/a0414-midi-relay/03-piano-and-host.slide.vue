<template>
    <main class="flex h-screen w-full flex-col p-10 text-2xl justify-center text-stone-800">
        <section class="flex gap-4 mx-auto pb-20">
            <div class="flex flex-col">
                <img class="h-30" src="./electric-piano.svg" alt="电钢琴示意图">
                <div>电钢琴 <span class="text-sm text-stone-400">MIDI 设备</span></div>
            </div>
            <div class="w-50 flex items-center">
                <span class="border-t flex-1"></span>
                <span class="text-lg px-1">USB</span>
                <span class="border-t flex-1"></span>
            </div>
            <div class="flex flex-col">
                <img class="h-30" src="./usb-host.svg" alt="USB 主机示意图">
                <div>USB 主机 <span class="text-sm text-stone-400">电脑/平板/手机</span></div>
            </div>
        </section>
    </main>
</template>
