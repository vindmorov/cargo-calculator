import { useMemo, useState } from 'react';
import { ArrowDownToLine, ArrowRight, Bot, Check, ChevronDown, CircleHelp, Edit3, Fuel, Plus, Route, Send, Sparkles, Truck, UserRound, UsersRound } from 'lucide-react';

type Mode = 'interface' | 'assistant';
type Profile = 'gazelle' | 'driver' | 'fleet' | 'manual';

const profiles: Array<{ id: Profile; title: string; note: string; icon: typeof Truck }> = [
  { id: 'gazelle', title: 'Газель', note: 'Перевозки до 3,5 тонн', icon: Truck },
  { id: 'driver', title: 'Сам за рулём', note: 'Своя машина, работаю сам', icon: UserRound },
  { id: 'fleet', title: 'Владелец автопарка', note: 'Машины и наёмные водители', icon: UsersRound },
  { id: 'manual', title: 'Сам настрою', note: 'Укажу свои расходы', icon: Sparkles },
];

const rub = (value: number) => `${Math.round(value).toLocaleString('ru-RU')} ₽`;

function Field({ label, value, onChange, suffix }: { label: string; value: string | number; onChange?: (value: string) => void; suffix?: string }) {
  return <label className="field"><span>{label}</span><div><input value={value} onChange={e => onChange?.(e.target.value)} readOnly={!onChange} />{suffix && <em>{suffix}</em>}</div></label>;
}

function ProfileArt({ profile }: { profile: Profile }) {
  if (profile === 'fleet') return <div className="profile-art fleet-art"><Truck /><Truck /><span><UsersRound /></span></div>;
  if (profile === 'manual') return <div className="profile-art manual-art"><span>32</span><i></i><b>₽/км</b></div>;
  return <div className={`profile-art ${profile}-art`}><Truck /><span>{profile === 'gazelle' ? '1,5 т' : '20 т'}</span></div>;
}

function ProfilePicker({ profile, setProfile, onContinue }: { profile: Profile | null; setProfile: (p: Profile) => void; onContinue: () => void }) {
  const [editing, setEditing] = useState(false);
  return <div className="step-content">
    <div className="question-copy"><span>ШАГ 1</span><h2>Какой вы грузоперевозчик?</h2><p>Выберем подходящие расходы. Каждое значение можно изменить позже.</p></div>
    <div className="profile-grid" role="radiogroup" aria-label="Профиль перевозчика">
      {profiles.map(item => { const Icon = item.icon; return <button key={item.id} className={`profile-card ${profile === item.id ? 'selected' : ''}`} role="radio" aria-checked={profile === item.id} onClick={() => { setProfile(item.id); setEditing(item.id === 'manual'); }}>
        <ProfileArt profile={item.id} /><span className="radio-mark">{profile === item.id && <Check />}</span><div className="profile-title"><Icon /><strong>{item.title}</strong></div><p>{item.note}</p>
      </button>; })}
    </div>
    {profile && <div className="preset-card">
      <div className="preset-heading"><div><small>{profile === 'manual' ? 'ВАШИ НАСТРОЙКИ' : 'МЫ ПОДСТАВИЛИ ТИПОВЫЕ ЗНАЧЕНИЯ'}</small><strong>{profiles.find(p => p.id === profile)?.title}</strong></div><button className="icon-button" aria-label="Изменить настройки" onClick={() => setEditing(!editing)}><Edit3 /></button></div>
      {!editing && <div className="preset-values"><span>Без НДС</span><span>{profile === 'gazelle' ? '1,5 т' : profile === 'fleet' ? '5 машин' : '20 т'}</span><span>{profile === 'gazelle' ? '16' : '32'} л / 100 км</span><span>Ремонт 4 ₽ / км</span></div>}
      {editing && <ExpenseAccordion profile={profile} />}
    </div>}
    <button className="primary-button" disabled={!profile} onClick={onContinue}>Перейти к параметрам рейса <ArrowRight /></button>
  </div>;
}

function ExpenseAccordion({ profile }: { profile: Profile }) {
  const [section, setSection] = useState('vehicle');
  const sections = [
    { id: 'company', title: 'Компания', summary: profile === 'fleet' ? '5 машин · НДС 22%' : '1 машина · без НДС' },
    { id: 'vehicle', title: 'Машина', summary: profile === 'gazelle' ? '1,5 т · 16 л/100 км' : '20 т · 32 л/100 км' },
    { id: 'driver', title: 'Водитель', summary: profile === 'fleet' ? 'Наёмные водители' : 'Работаю сам' },
    { id: 'office', title: 'Офис и прочее', summary: profile === 'fleet' ? '65 000 ₽ / мес.' : '0 ₽ / мес.' },
  ];
  return <div className="expense-accordion">{sections.map(item => <div className={`expense-section ${section === item.id ? 'open' : ''}`} key={item.id}>
    <button onClick={() => setSection(item.id)}><span><strong>{item.title}</strong><small>{item.summary}</small></span><ChevronDown /></button>
    {section === item.id && <div className="expense-fields">{item.id === 'vehicle' ? <><Field label="Грузоподъёмность" value={profile === 'gazelle' ? 1.5 : 20} suffix="т"/><Field label="Расход топлива" value={profile === 'gazelle' ? 16 : 32} suffix="л / 100 км"/><Field label="Амортизация" value={profile === 'gazelle' ? 18000 : 45000} suffix="₽ / мес."/><Field label="Ремонт и ТО" value={4} suffix="₽ / км"/></> : <p>Типовые значения заполнены. Детальные поля будут подключены к расчётной модели.</p>}</div>}
  </div>)}</div>;
}

function RouteStep({ profile, from, to, rate, setFrom, setTo, setRate, extras, setExtras, onCalculate }: any) {
  const toggleExtra = (id: string) => setExtras((current: string[]) => current.includes(id) ? current.filter(x => x !== id) : [...current, id]);
  const extraOptions = [['return', 'Туда-обратно'], ['empty', 'Порожний пробег'], ['point', 'Промежуточная точка'], ['waiting', 'Простой'], ['services', 'Доп. услуги'], ['toll', 'Избегать платных дорог']];
  return <div className="step-content route-step">
    <div className="question-copy"><span>ШАГ 2</span><h2>Куда и за какую ставку едем?</h2><p>Укажите маршрут и предложение клиента. Дополнительные условия включаются одним нажатием.</p></div>
    <div className="compact-profile"><span><b>Ваш профиль:</b> {profiles.find(p => p.id === profile)?.title} · {profile === 'gazelle' ? '1,5 т' : '20 т'} · без НДС</span><button className="icon-button"><Edit3 /></button></div>
    <div className="route-card"><div className="route-rail"><i></i><span></span><i></i></div><div className="route-fields"><Field label="ОТКУДА" value={from} onChange={setFrom}/><Field label="КУДА" value={to} onChange={setTo}/></div><button className="round-add" aria-label="Добавить точку"><Plus /></button></div>
    <div className="route-meta"><span><Route /> Расстояние по маршруту</span><strong>{from && to ? '1 068 км · около 2,4 дня' : 'Укажите маршрут'}</strong></div>
    <div className="rate-grid"><Field label="СТАВКА КЛИЕНТА" value={rate} onChange={setRate} suffix="₽"/><Field label="НДС В СТАВКЕ" value="22%" /></div>
    <h3 className="subheading">Уточнить условия рейса</h3><div className="chips">{extraOptions.map(([id, label]) => <button key={id} className={extras.includes(id) ? 'active' : ''} onClick={() => toggleExtra(id)}>{id === 'empty' || id === 'point' || id === 'services' ? <Plus /> : null}{label}</button>)}</div>
    {extras.includes('empty') && <div className="extra-detail"><div><small>ПОРОЖНИЙ ПРОБЕГ ВКЛЮЧЁН</small><strong>До погрузки: 75 км</strong></div><button className="icon-button"><Edit3 /></button></div>}
    <div className="preview-strip"><div><small>ОБЩИЙ ПРОБЕГ</small><strong>{extras.includes('empty') ? '1 143 км' : '1 068 км'}</strong></div><div><small>ВРЕМЯ В ПУТИ</small><strong>≈ 2,6 дня</strong></div><div><small>СТАВКА ЗА КМ</small><strong>{rate ? `${Math.round(Number(rate) / (extras.includes('empty') ? 1143 : 1068))} ₽` : '—'}</strong></div><p>Полный расчёт расходов появится на следующем шаге.</p></div>
    <button className="primary-button" disabled={!from || !to || !rate} onClick={onCalculate}>Рассчитать себестоимость и прибыль <ArrowRight /></button>
  </div>;
}

function ResultStep({ rate, onReality }: { rate: number; onReality: () => void }) {
  const costs = Math.round(rate * .73); const profit = rate - costs;
  return <div className="step-content result-step"><div className="question-copy"><span>ШАГ 3</span><h2>Результат рейса</h2><p>В расчёте учтены постоянные, переменные расходы и стоимость вашего труда.</p></div>
    <div className="verdict"><span><Check /></span><div><strong>Рейс выгодный</strong><p>Рентабельность выше минимального рекомендуемого уровня для такого рейса.</p></div></div>
    <div className="profit-hero"><small>ПРИБЫЛЬ С РЕЙСА</small><strong>{rub(profit)}</strong><span>из ставки клиента {rub(rate)}</span><p>После всех расходов с каждого полученного рубля у вас остаётся <b>27 копеек</b>.</p></div>
    <div className="metric-grid"><div><small>СЕБЕСТОИМОСТЬ</small><strong>{rub(costs)}</strong></div><div><small>РЕНТАБЕЛЬНОСТЬ</small><strong className="positive">27%</strong></div><div><small>ПРИБЫЛЬ НА КМ</small><strong>{rub(profit / 1143)}</strong></div></div>
    <div className="cost-card"><h3>Из чего складываются расходы за рейс</h3><div className="chart-layout"><div className="donut"><div><small>ВСЕ РАСХОДЫ</small><strong>{rub(costs)}</strong></div></div><div className="legend">{[['fuel','Топливо',43],['labor','Стоимость труда',26],['vehicle','Машина: ремонт и амортизация',18],['other','Дорога, риски и прочее',13]].map(([id,label,pct]) => <div key={id}><i className={String(id)}></i><span>{label}</span><strong>{rub(costs * Number(pct) / 100)} · {pct}%</strong></div>)}</div></div></div>
    <div className="insight"><Fuel /><p><strong>Больше всего на результат влияет топливо.</strong><br/>Это 43% всех расходов. Если расход вырастет на 3 л/100 км, прибыль снизится примерно на 3 000 ₽.</p></div>
    <div className="button-row"><button className="secondary-button"><ArrowDownToLine /> Скачать расчёт</button><button className="primary-button" onClick={onReality}>Проверить другие, более прибыльные варианты</button></div>
  </div>;
}

function RealityStep({ calculated }: { calculated: number }) {
  const [answer, setAnswer] = useState('less'); const [actual, setActual] = useState(Math.round(calculated * .8)); const [uplift, setUplift] = useState(8000);
  return <div className="step-content reality-step"><div className="question-copy"><span>ШАГ 4</span><h2>Обычно вы зарабатываете примерно столько же?</h2><p>Сравним расчёт с вашим опытом, не изменяя исходный вариант.</p></div>
    <div className="chips answer-chips">{[['same','Да, похоже'],['less','Обычно меньше'],['more','Обычно больше'],['unknown','Не знаю']].map(([id,label]) => <button className={answer === id ? 'active' : ''} onClick={() => setAnswer(id)} key={id}>{label}</button>)}</div>
    {answer !== 'unknown' && answer !== 'same' && <div className="reality-card"><div className="slider-heading"><div><small>ОБЫЧНО ПОЛУЧАЕТСЯ</small><strong>{rub(actual)}</strong></div><span>Расчёт: {rub(calculated)}</span></div><input type="range" min="0" max={calculated * 2} value={actual} onChange={e => setActual(Number(e.target.value))}/><p className="delta">Разница {rub(actual - calculated)}. Возможно, одна или несколько статей расходов отличаются от типовых.</p><div className="cause-list"><button><span>Расход топлива может быть выше примерно на 3 л/100 км</span><b>−3 050 ₽</b></button><button><span>Простой мог занять около 9 дополнительных часов</span><b>−2 700 ₽</b></button><button><span>Ремонт и ТО могут стоить ближе к 6 ₽/км</span><b>Уточнить</b></button></div></div>}
    <div className="scenario-card"><h3>Как сделать похожий рейс прибыльнее</h3><p>Меняйте условия — исходный расчёт останется прежним.</p><div className="scenario-controls"><label><span>СТАВКА КЛИЕНТА</span><input type="range" min="0" max="20000" step="1000" value={uplift} onChange={e => setUplift(Number(e.target.value))}/><b>+ {rub(uplift)}</b></label><button>Порожний пробег <b>− 40 км</b></button><button>Платная дорога <b>не использовать</b></button></div><div className="new-profit"><span>Новая возможная прибыль</span><strong>{rub(calculated + uplift)}</strong></div></div>
  </div>;
}

function Stepper({ step, setStep, profile, setProfile, shared }: any) {
  const labels = ['Ваш профиль', 'Параметры рейса', 'Результат', 'Проверка реальностью'];
  const summaries = [profile ? `${profiles.find(p => p.id === profile)?.title} · без НДС` : '', shared.from && shared.to ? `${shared.from} → ${shared.to} · ${shared.rate} ₽` : '', step > 3 ? `Прибыль ${rub(Number(shared.rate) * .27)}` : '', ''];
  return <div className="stepper-shell">{labels.map((label, index) => { const n = index + 1; const done = step > n; return <section className={`stepper-item ${step === n ? 'current' : ''} ${done ? 'done' : ''}`} key={label}><div className="step-marker">{done ? <Check /> : n}</div><div className="step-line"></div><div className="stepper-panel"><button className="stepper-title" onClick={() => done && setStep(n)} disabled={!done}><span>{label}</span>{done && <><small>{summaries[index]}</small><Edit3 /></>}</button>{step === n && <div className="stepper-reveal">{n === 1 ? <ProfilePicker profile={profile} setProfile={setProfile} onContinue={() => setStep(2)} /> : n === 2 ? <RouteStep profile={profile} {...shared} onCalculate={() => setStep(3)} /> : n === 3 ? <ResultStep rate={Number(shared.rate)} onReality={() => setStep(4)} /> : <RealityStep calculated={Number(shared.rate) * .27}/>}</div>}</div></section>; })}</div>;
}

function Assistant({ step, setStep, profile, setProfile, shared }: any) {
  return <div className="assistant-shell"><div className="assistant-thread"><div className="ai-message"><div className="ai-avatar"><Bot /></div><div><strong>Помощник перевозчика</strong><p>{step === 1 ? 'Давайте посчитаем прибыль с рейса. Сначала подберу подходящую модель расходов.' : step === 2 ? 'Профиль готов. Теперь разберёмся с маршрутом и ставкой клиента.' : step === 3 ? 'Готово. По вашим данным рейс выгодный — ниже полный расчёт.' : 'Сравним расчёт с вашим опытом и попробуем улучшить результат.'}</p></div></div><div className="assistant-card">{step === 1 ? <ProfilePicker profile={profile} setProfile={setProfile} onContinue={() => setStep(2)} /> : step === 2 ? <RouteStep profile={profile} {...shared} onCalculate={() => setStep(3)} /> : step === 3 ? <ResultStep rate={Number(shared.rate)} onReality={() => setStep(4)} /> : <RealityStep calculated={Number(shared.rate) * .27}/>}</div></div><div className="composer"><Plus /><span>Спросить про расчёт</span><button aria-label="Отправить"><Send /></button></div></div>;
}

export function App() {
  const [mode, setMode] = useState<Mode>('interface'); const [step, setStep] = useState(1); const [profile, setProfile] = useState<Profile | null>(null); const [from, setFrom] = useState('Самара'); const [to, setTo] = useState('Москва'); const [rate, setRate] = useState('145000'); const [extras, setExtras] = useState<string[]>(['empty']);
  const shared = useMemo(() => ({ from, to, rate, setFrom, setTo, setRate, extras, setExtras }), [from, to, rate, extras]);
  return <main className={`app mode-${mode}`}><header><a className="brand" href="#" aria-label="На главную"><span>точка</span><b>экономика рейса</b></a><nav className="mode-switch" aria-label="Режим интерфейса"><button className={mode === 'interface' ? 'active' : ''} onClick={() => setMode('interface')}>Интерфейс</button><button className={mode === 'assistant' ? 'active' : ''} onClick={() => setMode('assistant')}><Sparkles /> AI-ассистент</button></nav><button className="help-button"><CircleHelp /> Как считается</button></header><div className="page-intro"><div><span>КАЛЬКУЛЯТОР ГРУЗОПЕРЕВОЗКИ</span><h1>Сколько вы заработаете на рейсе</h1></div><p>Считаем топливо, машину, работу водителя и расходы компании — чтобы ставка клиента была выгодной.</p></div><div className="workspace">{mode === 'interface' ? <Stepper step={step} setStep={setStep} profile={profile} setProfile={setProfile} shared={shared}/> : <Assistant step={step} setStep={setStep} profile={profile} setProfile={setProfile} shared={shared}/>}</div></main>;
}
