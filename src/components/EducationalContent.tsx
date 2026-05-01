import React from 'react';

export const EducationalContent: React.FC = () => {
  return (
    <div className="space-y-20 py-12 w-full max-w-4xl mx-auto font-sans">
      <section>
        <h2 className="text-3xl font-black text-blue-400 mb-8 flex items-center gap-3 tracking-tight">
          Процесс нагрева
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5">
            <h4 className="text-blue-300 font-bold mb-2">1. Генерация</h4>
            <p className="text-sm text-slate-400">Преобразователь повышает частоту тока до 20–60 кГц</p>
          </div>
          <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5">
            <h4 className="text-blue-300 font-bold mb-2">2. Излучение</h4>
            <p className="text-sm text-slate-400">Катушка создаёт быстро меняющееся магнитное поле</p>
          </div>
          <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5">
            <h4 className="text-blue-300 font-bold mb-2">3. Индукция</h4>
            <p className="text-sm text-slate-400">Поле наводит вихревые токи в ферромагнитном дне посуды</p>
          </div>
          <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5">
            <h4 className="text-blue-300 font-bold mb-2">4. Нагрев</h4>
            <p className="text-sm text-slate-400">Сопротивление металла превращает ток в тепло</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden p-10 bg-slate-900 rounded-[40px] border border-blue-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] -z-10" />
        
        <h3 className="text-2xl font-black mb-8 text-white tracking-tight flex items-center gap-4">
          Какие параметры учитываются в симуляции?
        </h3>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-300 shadow-[0_0_8px_rgba(59,130,246,1)]" />
              <h4 className="text-blue-300 font-black text-sm tracking-widest text-opacity-90">Магнитный поток (Φ)</h4>
            </div>
            <p className="text-300 leading-relaxed">
              Почему значение потока постоянно меняется? Плита работает на <strong>переменном токе</strong>. 
              Это значит, что магнитное поле не просто есть, оно постоянно растёт и падает по синусоидальному закону
            </p>
            <p className="text-sm text--400 bg-slate-950/50 p-4 rounded-xl border border-white/5">
              Согласно закону Фарадея, только изменяющийся во времени поток способен 
              создать ЭДС, которая заставляет электроны двигаться, разогревая металл
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-300 shadow-[0_0_8px_rgba(249,115,22,1)]" />
              <h4 className="text-orange-300 font-black text-sm tracking-widest text-opacity-90">Циклическая частота (ω)</h4>
            </div>
            <p className="text-300 leading-relaxed">
              В расчёте скин-эффекта мы используем не просто частоту (Гц), а 
              циклическую частоту (ω = 2πf). Она определяет динамику затухания электромагнитной волны в проводнике
            </p>
            <div className="p-4 bg-slate-950/50 rounded-xl border border-white/5 space-y-2">
              <p className="text-xs text-slate-400 tracking-tighter">Формула скин-слоя:</p>
              <p className="text-xl text-white font-mono flex items-center gap-2">
                δ = √(2ρ / <span className="text-orange-400">ω</span>μ)
              </p>
               <p className="text-[12px] text-400 font-sans leading-tight">
                Чем выше угловая скорость ω, тем меньше времени у поля на проникновение вглубь, 
                поэтому на частоте 60 кГц зона нагрева становится предельно тонкой
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-black text-blue-400 mb-8 flex items-center gap-3 tracking-tight">
          Как работает система?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { n: "1", t: "Посуда", d: "Металл (сталь, чугун), в котором возникают токи Фуко" },
            { n: "2", t: "Стеклокерамика", d: "Прочная диэлектрическая поверхность, беспрепятственно пропускающая магнитное поле" },
            { n: "3", t: "Изоляция", d: "Тепловой барьер, защищающий медную катушку от перегрева со стороны раскалённого дна" },
            { n: "4", t: "Медная катушка", d: "Плоский индуктор, являющийся источником переменного магнитного потока высокой силы" },
            { n: "5", t: "Преобразователь", d: "Силовой инвертор, создающий ток высокой частоты для эффективной работы индукции" },
            { n: "6", t: "Блок управления", d: "Контроллер мощности и температурных режимов" }
          ].map((item) => (
            <div key={item.n} className="group flex gap-4 p-5 bg-slate-900/60 rounded-2xl border border-white/5 items-start hover:bg-slate-800/80 transition-all duration-300 shadow-lg">
              <span className="text-lg font-black text-blue-500 bg-blue-500/10 w-10 h-10 flex items-center justify-center rounded-full shrink-0 border border-blue-500/20 group-hover:scale-110 transition-transform">
                {item.n}
              </span>
              <div>
                <h4 className="text-base font-bold text-white leading-tight">{item.t}</h4>
                <p className="text-[13px] text-slate-400 mt-1.5 leading-relaxed">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="p-8 bg-blue-900/10 border-l-4 border-blue-500 rounded-r-3xl backdrop-blur-sm">
          <h3 className="text-xl font-bold text-blue-400 mb-3 tracking-tighter">Безопасность</h3>
          <p className="text-slate-300 leading-relaxed">
            Энергия передаётся напрямую в металл. В итоге поверхность остаётся безопасной для касания
          </p>
        </div>
        <div className="p-8 bg-emerald-900/10 border-l-4 border-emerald-500 rounded-r-3xl backdrop-blur-sm">
          <h3 className="text-xl font-bold text-emerald-400 mb-3 tracking-tighter">Эффективность</h3>
          <p className="text-slate-300 leading-relaxed">
            КПД индукции около <b>90%</b>, что больше чем КПД газовой (30-60%) и электрической (60-70%) плиты
          </p>
        </div>
      </section>
    </div>
  );
};