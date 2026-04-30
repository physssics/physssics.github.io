import React from 'react';

export const EducationalContent: React.FC = () => {
  return (
    <div className="space-y-20 py-12 w-full">
      
      <section>
        <h2 className="text-3xl font-black text-blue-400 mb-8 flex items-center gap-3">
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

      <section>
        <h2 className="text-3xl font-black text-blue-400 mb-8 flex items-center gap-3">
          Устройство системы
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
            <div key={item.n} className="flex gap-4 p-4 bg-slate-900/60 rounded-2xl border border-white/5 items-center shadow-lg">
              <span className="text-lg font-black text-blue-500 bg-blue-500/10 w-10 h-10 flex items-center justify-center rounded-full shrink-0 border border-blue-500/20">
                {item.n}
              </span>
              <div>
                <h4 className="text-base font-bold text-white leading-tight">{item.t}</h4>
                <p className="text-[13px] text-slate-400 mt-0.5">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="p-8 bg-blue-900/10 border-l-4 border-blue-500 rounded-r-3xl">
          <h3 className="text-xl font-bold text-blue-400 mb-3 flex items-center gap-2">
            Безопасность
          </h3>
          <p className="text-lg text-slate-300">
            Плита греет только металл. Поверхность остаётся безопасной для касания
          </p>
        </div>
        <div className="p-8 bg-emerald-900/10 border-l-4 border-emerald-500 rounded-r-3xl">
          <h3 className="text-xl font-bold text-emerald-400 mb-3 flex items-center gap-2">
            Эффективность
          </h3>
          <p className="text-lg text-slate-300">
            КПД индукции около <b>90%</b>, что больше чем КПД газовой (30-60%) и электрической (60-70%) плиты
          </p>
        </div>
      </section>

      <div className="info-card border-l-8 border-blue-600 bg-slate-900 p-10 rounded-[32px] shadow-2xl">
        <h3 className="text-xl font-black mb-4 text-white tracking-tight">Что такое B-Flux на симуляции?</h3>
        <p className="text-lg text-slate-400 leading-relaxed">
          <strong>Магнитный поток (Φ)</strong> — это количество энергии поля, проходящей сквозь дно посуды.
          Он зависит от тока в катушке. Его <em>быстрое изменение</em> заставляет электроны двигаться, разогревая посуду
        </p>
      </div>
    </div>
  );
};