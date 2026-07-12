import { useState } from 'react'
import {
  ArrowDownRight, ArrowUpRight, Bell, Box, Check, ChevronDown, CircleDollarSign,
  Clock3, Command, CreditCard, FileText, Grid2X2, HelpCircle, LayoutDashboard,
  Menu, MessageSquareText, Moon, MoreHorizontal, Package, Plus, Search, Settings,
  ShoppingBag, Sun, TrendingUp, Truck, UserRound, Users, X, Zap
} from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

type IconType = typeof LayoutDashboard

const nav: { label: string; icon: IconType; badge?: string }[] = [
  { label: 'Обзор', icon: LayoutDashboard },
  { label: 'Заказы', icon: ShoppingBag, badge: '14' },
  { label: 'Клиенты', icon: Users },
  { label: 'Товары', icon: Package },
  { label: 'Финансы', icon: CircleDollarSign },
  { label: 'Отчёты', icon: FileText },
]

const chartData = [
  { day: '1 июл', current: 188, prev: 142 }, { day: '3 июл', current: 231, prev: 176 },
  { day: '5 июл', current: 205, prev: 185 }, { day: '7 июл', current: 316, prev: 192 },
  { day: '9 июл', current: 284, prev: 224 }, { day: '11 июл', current: 405, prev: 248 },
  { day: '13 июл', current: 371, prev: 276 }, { day: '15 июл', current: 468, prev: 305 },
  { day: '17 июл', current: 421, prev: 341 }, { day: '19 июл', current: 548, prev: 367 },
  { day: '21 июл', current: 514, prev: 382 }, { day: '23 июл', current: 622, prev: 418 },
  { day: '25 июл', current: 581, prev: 451 }, { day: '27 июл', current: 692, prev: 493 },
  { day: '29 июл', current: 653, prev: 518 }, { day: '31 июл', current: 748, prev: 552 },
]

const orders = [
  { id: '#OR-1048', name: 'Алина Морозова', initials: 'АМ', sum: '18 420 ₽', status: 'Оплачен', color: 'violet', time: '5 мин назад' },
  { id: '#OR-1047', name: 'Михаил Волков', initials: 'МВ', sum: '6 890 ₽', status: 'В доставке', color: 'blue', time: '18 мин назад' },
  { id: '#OR-1046', name: 'Мария Соколова', initials: 'МС', sum: '12 150 ₽', status: 'Собирается', color: 'amber', time: '42 мин назад' },
  { id: '#OR-1045', name: 'Денис Лебедев', initials: 'ДЛ', sum: '4 790 ₽', status: 'Оплачен', color: 'violet', time: '1 ч назад' },
  { id: '#OR-1044', name: 'Анна Крылова', initials: 'АК', sum: '23 580 ₽', status: 'Доставлен', color: 'green', time: '2 ч назад' },
]

const products = [
  { name: 'Наушники AirBeat Pro', cat: 'Аудио', price: '12 990 ₽', sold: '184', icon: '🎧', bg: '#e9e7ff' },
  { name: 'Умная колонка Mini', cat: 'Умный дом', price: '7 490 ₽', sold: '142', icon: '🔊', bg: '#e1f3ed' },
  { name: 'Часы Chronos S4', cat: 'Гаджеты', price: '18 990 ₽', sold: '98', icon: '⌚', bg: '#fff0dc' },
]

function Sidebar({ active, setActive, open, close }: { active: string; setActive: (s: string) => void; open: boolean; close: () => void }) {
  return <>
    {open && <button className="backdrop" onClick={close} aria-label="Закрыть меню" />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Zap size={18} fill="currentColor" /></div><span>forma<span className="brand-dot">°</span></span></div>
      <div className="workspace"><div className="workspace-logo">F</div><div><b>Forma Market</b><small>commerce studio</small></div><ChevronDown size={16} /></div>
      <nav className="main-nav">
        <p>УПРАВЛЕНИЕ</p>
        {nav.map(item => <button key={item.label} className={active === item.label ? 'active' : ''} onClick={() => { setActive(item.label); close() }}>
          <item.icon size={19} /><span>{item.label}</span>{item.badge && <em>{item.badge}</em>}
        </button>)}
        <p>СИСТЕМА</p>
        <button onClick={() => setActive('Сообщения')}><MessageSquareText size={19} /><span>Сообщения</span><i>3</i></button>
        <button onClick={() => setActive('Настройки')}><Settings size={19} /><span>Настройки</span></button>
      </nav>
      <div className="sidebar-card pulse-card"><div className="pulse-head"><div className="pulse-dot"/><span>Система работает</span></div><b>98,7% заказов вовремя</b><span>Все интеграции активны</span><div className="pulse-bars"><i/><i/><i/><i/><i/><i/><i/><i/></div></div>
      <div className="profile"><div className="avatar avatar-photo">AK</div><div><b>Алексей Котов</b><small>Администратор</small></div><MoreHorizontal size={18} /></div>
    </aside>
  </>
}

function Header({ title, menu, dark, setDark, createOrder, notifications }: { title: string; menu: () => void; dark: boolean; setDark: (v: boolean) => void; createOrder: () => void; notifications: () => void }) {
  return <header><button className="mobile-menu icon-button" onClick={menu}><Menu size={20} /></button><div className="title-wrap"><h1>{title}</h1><span>Воскресенье, 12 июля</span></div>
    <div className="header-actions"><label className="search"><Search size={18} /><input placeholder="Найти что угодно..." /><kbd><Command size={12} /> K</kbd></label>
      <button className="icon-button theme" onClick={() => setDark(!dark)}>{dark ? <Sun size={19} /> : <Moon size={19} />}</button>
      <button className="icon-button notification" onClick={notifications} aria-label="Уведомления"><Bell size={19} /><i /></button>
      <button className="primary" onClick={createOrder}><Plus size={18} />Создать заказ</button>
    </div></header>
}

function Metric({ icon: Icon, label, value, change, good, tone }: { icon: IconType; label: string; value: string; change: string; good: boolean; tone: string }) {
  return <article className="metric card"><div className={`metric-icon ${tone}`}><Icon size={20} /></div><button><MoreHorizontal size={18} /></button><span>{label}</span><strong>{value}</strong><div className={good ? 'change good' : 'change bad'}>{good ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{change}<small>к прошлому месяцу</small></div></article>
}

function Dashboard() {
  return <>
    <section className="welcome"><div><h2>Добрый день, Алексей <span>👋</span></h2><p>Вот что происходит с вашим магазином сегодня.</p></div><button className="date-button"><Clock3 size={17} /><span>1–31 июля</span><ChevronDown size={15} /></button></section>
    <section className="metrics">
      <Metric icon={CircleDollarSign} label="Общая выручка" value="1 284 560 ₽" change="12,5%" good tone="indigo" />
      <Metric icon={ShoppingBag} label="Заказы" value="1 048" change="8,2%" good tone="cyan" />
      <Metric icon={UserRound} label="Новые клиенты" value="386" change="3,1%" good tone="orange" />
      <Metric icon={TrendingUp} label="Конверсия" value="4,82%" change="0,6%" good={false} tone="pink" />
    </section>
    <section className="dashboard-grid">
      <article className="card revenue"><div className="card-heading"><div><h3>Динамика выручки</h3><p>Сравнение с предыдущим периодом</p></div><button className="select-button">Последние 30 дней<ChevronDown size={15} /></button></div>
        <div className="revenue-total"><strong>1 284 560 ₽</strong><span><ArrowUpRight size={14} />12,5%</span></div>
        <div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}><defs><linearGradient id="fillCurrent" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6658e8" stopOpacity={0.25}/><stop offset="100%" stopColor="#6658e8" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)"/><XAxis dataKey="day" axisLine={false} tickLine={false} interval={3} tick={{ fill: 'var(--muted)', fontSize: 11 }}/><Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--line)', background: 'var(--card)' }} formatter={(v) => [`${v} тыс. ₽`, 'Выручка']}/><Area type="monotone" dataKey="prev" stroke="#c8c9d4" strokeWidth={2} strokeDasharray="5 5" fill="transparent"/><Area type="monotone" dataKey="current" stroke="#6658e8" strokeWidth={3} fill="url(#fillCurrent)"/></AreaChart></ResponsiveContainer></div>
        <div className="legend"><span><i className="dot-current" />Этот месяц</span><span><i className="dot-prev" />Прошлый месяц</span></div>
      </article>
      <article className="card goal"><div className="card-heading"><div><h3>Цель месяца</h3><p>Июль 2026</p></div><button><MoreHorizontal size={18}/></button></div><div className="goal-ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="49"/><circle className="progress" cx="60" cy="60" r="49"/></svg><div><strong>78%</strong><span>выполнено</span></div></div><div className="goal-numbers"><div><span>Получено</span><strong>1,28 млн ₽</strong></div><div><span>Цель</span><strong>1,65 млн ₽</strong></div></div><div className="goal-note"><TrendingUp size={16}/><span>Отличный темп! Осталось <b>365 440 ₽</b></span></div></article>
    </section>
    <section className="lower-grid">
      <article className="card orders"><div className="card-heading"><div><h3>Последние заказы</h3><p>14 новых заказов сегодня</p></div><button className="link-button">Все заказы <ArrowUpRight size={15}/></button></div><div className="table-wrap"><table><thead><tr><th>ЗАКАЗ</th><th>КЛИЕНТ</th><th>СУММА</th><th>СТАТУС</th><th>ВРЕМЯ</th><th /></tr></thead><tbody>{orders.map(o => <tr key={o.id}><td><b>{o.id}</b></td><td><div className="customer"><span className="avatar">{o.initials}</span>{o.name}</div></td><td><b>{o.sum}</b></td><td><span className={`status ${o.color}`}><i />{o.status}</span></td><td className="muted">{o.time}</td><td><MoreHorizontal size={17}/></td></tr>)}</tbody></table></div><div className="mobile-order-list">{orders.slice(0,4).map(o=><div className="mobile-order" key={o.id}><span className="avatar">{o.initials}</span><div><b>{o.name}</b><small>{o.id} · {o.time}</small></div><div><b>{o.sum}</b><span className={`status ${o.color}`}>{o.status}</span></div></div>)}</div></article>
      <article className="card products"><div className="card-heading"><div><h3>Лидеры продаж</h3><p>За последние 30 дней</p></div><button><MoreHorizontal size={18}/></button></div>{products.map((p, i) => <div className="product" key={p.name}><div className="product-img" style={{background:p.bg}}>{p.icon}</div><div><b>{p.name}</b><span>{p.cat}</span></div><div><b>{p.price}</b><span>{p.sold} продано</span></div><em>0{i+1}</em></div>)}<button className="all-products">Посмотреть все товары</button></article>
    </section>
  </>
}

function OrdersPage() {
  const [filter, setFilter] = useState('Все')
  return <section className="page-card card"><div className="page-head"><div><h2>Заказы</h2><p>Управляйте заказами и отслеживайте их статусы.</p></div><button className="primary"><Plus size={18}/>Новый заказ</button></div><div className="filters">{['Все','Новые','В работе','В доставке','Завершённые'].map(f => <button className={filter === f ? 'selected':''} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div><div className="table-wrap"><table><thead><tr><th>ЗАКАЗ</th><th>КЛИЕНТ</th><th>СУММА</th><th>СТАТУС</th><th>ВРЕМЯ</th><th/></tr></thead><tbody>{[...orders,...orders.map((x,i)=>({...x,id:`#OR-${1043-i}`}))].map((o,i)=><tr key={o.id}><td><b>{o.id}</b></td><td><div className="customer"><span className="avatar">{o.initials}</span>{o.name}</div></td><td><b>{o.sum}</b></td><td><span className={`status ${o.color}`}><i/>{o.status}</span></td><td className="muted">{i+1} ч назад</td><td><MoreHorizontal size={17}/></td></tr>)}</tbody></table></div></section>
}

function GenericPage({title}:{title:string}) {
  const map: Record<string, [string, string, IconType]> = {
    'Клиенты':['Клиентская база','386 активных клиентов',Users], 'Товары':['Каталог товаров','248 позиций в каталоге',Package],
    'Финансы':['Финансовый центр','Доходы, платежи и возвраты',CreditCard], 'Отчёты':['Отчёты и аналитика','Собирайте данные в одном месте',FileText],
    'Настройки':['Настройки пространства','Профиль, команда и интеграции',Settings], 'Сообщения':['Сообщения','Обращения клиентов и команды',MessageSquareText]
  }
  const [heading, desc, Icon] = map[title] || [title,'Раздел панели управления',Grid2X2]
  return <section className="page-card card"><div className="page-head"><div><h2>{heading}</h2><p>{desc}</p></div><button className="primary"><Plus size={18}/>Добавить</button></div><div className="generic-grid">{['Всего','Активные','За месяц'].map((x,i)=><div className="mini-card" key={x}><span>{x}</span><strong>{[248,186,42][i]}</strong><em><ArrowUpRight size={13}/> {12-i*2}%</em></div>)}</div><div className="empty-preview"><div><Icon size={30}/></div><h3>{heading}</h3><p>Мы подготовили основу этого раздела. Здесь появятся все необходимые инструменты для ежедневной работы.</p><button><Check size={16}/>Всё готово к настройке</button></div></section>
}

function OrderModal({ close }: { close: () => void }) {
  const [done, setDone] = useState(false)
  return <div className="modal-layer" role="dialog" aria-modal="true"><button className="modal-backdrop" onClick={close} aria-label="Закрыть"/><div className="modal-card">{done ? <div className="success-state"><div><Check size={28}/></div><h2>Заказ создан</h2><p>Новый заказ добавлен в список и готов к обработке.</p><button className="primary" onClick={close}>Готово</button></div> : <><div className="modal-head"><div><h2>Новый заказ</h2><p>Добавьте клиента и товары в заказ.</p></div><button className="icon-button" onClick={close}><X size={19}/></button></div><div className="form-grid"><label><span>Имя клиента</span><input placeholder="Например, Анна Смирнова"/></label><label><span>Телефон</span><input placeholder="+7 999 000-00-00"/></label><label className="wide"><span>Товар</span><select><option>Наушники AirBeat Pro</option><option>Умная колонка Mini</option><option>Часы Chronos S4</option></select></label><label><span>Количество</span><input type="number" defaultValue="1" min="1"/></label><label><span>Доставка</span><select><option>Курьером</option><option>Самовывоз</option></select></label></div><div className="order-summary"><span>Итого</span><strong>12 990 ₽</strong></div><div className="modal-actions"><button className="secondary" onClick={close}>Отмена</button><button className="primary" onClick={()=>setDone(true)}>Создать заказ</button></div></>}</div></div>
}

function Notifications({ close }: { close: () => void }) {
  const notes = [
    ['Новый заказ #OR-1049','Только что','Заказ на 9 490 ₽ ожидает подтверждения.'],
    ['Осталось мало товара','12 мин','Наушники AirBeat Pro — 4 шт. на складе.'],
    ['Цель месяца почти достигнута','1 ч','Вы выполнили план продаж на 78%.']
  ]
  return <div className="modal-layer drawer-layer"><button className="modal-backdrop" onClick={close} aria-label="Закрыть"/><aside className="drawer"><div className="modal-head"><div><h2>Уведомления</h2><p>3 новых события</p></div><button className="icon-button" onClick={close}><X size={19}/></button></div><button className="read-all">Отметить все прочитанными</button><div className="note-list">{notes.map((n,i)=><div className="note" key={n[0]}><div className={`note-icon n${i}`}><Bell size={17}/></div><div><b>{n[0]}</b><p>{n[2]}</p><small>{n[1]}</small></div></div>)}</div></aside></div>
}

export default function App() {
  const [active, setActive] = useState('Обзор')
  const [menu, setMenu] = useState(false)
  const [dark, setDark] = useState(false)
  const [orderModal, setOrderModal] = useState(false)
  const [noticePanel, setNoticePanel] = useState(false)
  return <div className={dark ? 'app dark' : 'app'}><Sidebar active={active} setActive={setActive} open={menu} close={()=>setMenu(false)}/><main><Header title={active} menu={()=>setMenu(true)} dark={dark} setDark={setDark} createOrder={()=>setOrderModal(true)} notifications={()=>setNoticePanel(true)}/><div className="content">{active === 'Обзор' ? <Dashboard/> : active === 'Заказы' ? <OrdersPage/> : <GenericPage title={active}/>}</div><button className="help"><HelpCircle size={20}/></button></main>{orderModal&&<OrderModal close={()=>setOrderModal(false)}/>} {noticePanel&&<Notifications close={()=>setNoticePanel(false)}/>}</div>
}
