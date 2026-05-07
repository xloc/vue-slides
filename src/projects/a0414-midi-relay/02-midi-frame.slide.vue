<template>
  <main class="flex h-screen w-full flex-col p-10 text-2xl justify-center text-stone-800">

    <section class="flex flex-col text-stone-400">
      <h2 class=" text-stone-500 text-lg">时间轴</h2>

      <span class="flex flex-1 items-center font-semibold">
        <span class="flex-1 border-t-2"></span>
        <span class="text-stone-800 bg-stone-100 px-4 py-2 rounded-lg">...</span>
        <span class="flex-1 border-t-2"></span>
        <span class="text-emerald-800 bg-emerald-100 px-4 py-2 rounded-lg">按下事件</span>
        <div class=" flex-1 border-t-2 relative">
          <div class="absolute top-1 text-sm left-0 px-1">钢琴发出C3的声音</div>
        </div>
        <span class="text-stone-800 bg-stone-100 px-4 py-2 rounded-lg">...</span>
        <span class="flex-1 border-t-2"></span>
        <span class="text-purple-800 bg-purple-100 px-4 py-2 rounded-lg">松开事件</span>
        <span class="flex-1 border-t-2"></span>
        <span class="text-stone-800 bg-stone-100 px-4 py-2 rounded-lg">...</span>
        <span class="flex-1 border-t-2"></span>
        <span class="size-2 rotate-45 border-r-2 border-t-2" aria-label="time arrow"></span>
      </span>
    </section>

    <div class="flex gap-2 justify-evenly mt-10 ">
      <section class="flex flex-col border-emerald-500 border bg-emerald-50 p-8 rounded-lg">
        <h2 class="items-end flex gap-2 text-emerald-800">
          <dt class="font-semibold">按下琴键 C3</dt>
          <dd class="text-stone-500 text-sm">事件名称</dd>
        </h2>


        <div class="flex gap-8 mt-5 text-4xl">
          <dl>
            <dt>0x90</dt>
            <dd class="text-lg text-stone-500">音符按下</dd>
          </dl>
          <dl>
            <dt>0x30</dt>
            <dd class="text-lg text-stone-500">音符是C3</dd>
          </dl>
          <dl>
            <dt>0x64</dt>
            <dd class="text-lg text-stone-500">力度 100</dd>
          </dl>
        </div>

      </section>

      <section class="flex flex-col border-purple-500 border bg-purple-50 p-8 rounded-lg">
        <h2 class="flex items-end gap-2 text-purple-800">
          <dt class="font-semibold">松开琴键 C3</dt>
          <dd class="text-stone-500 text-sm">事件名称</dd>
        </h2>

        <div class="flex gap-8 mt-5 text-4xl">
          <dl>
            <dt>0x80</dt>
            <dd class="text-lg text-stone-500">音符松开</dd>
          </dl>
          <dl>
            <dt>0x30</dt>
            <dd class="text-lg text-stone-500">音符是C3</dd>
          </dl>
          <dl>
            <dt>0x00</dt>
            <dd class="text-lg text-stone-500">力度 0</dd>
          </dl>
        </div>

      </section>
    </div>
  </main>
</template>
