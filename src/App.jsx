import React, { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";

const CARD = "bg-white rounded-2xl border border-slate-200 shadow p-4";
const BTN = v => [ "rounded-xl px-3 py-2 border text-sm font-medium transition",
  v==="primary" && "bg-blue-600 border-blue-600 text-white hover:bg-blue-700",
  v==="secondary" && "border-slate-300 bg-white hover:bg-slate-50",
  v==="danger" && "bg-rose-600 border-rose-600 text-white hover:bg-rose-700",
  v==="success" && "bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700",
].filter(Boolean).join(" ");

const UI = {
  Btn: ({v="secondary", ...p}) => <button {...p} className={BTN(v)} />,
  KPI: ({t,v}) => <div className={CARD}><div className="text-sm text-slate-600">{t}</div><div className="text-2xl font-semibold">{v}</div></div>,
  th: c => <th className="px-3 py-2 font-medium text-left">{c}</th>,
  td: c => <td className="px-3 py-2 text-sm">{c}</td>,
};

export default function App(){
  const [rows] = useState([
    {id:1,name:"สมชาย ใจดี",team:"A",bus:"1",day:"Day1",session:"AM",shirt_size:"M",meal_type:"ปกติ",checked:true},
    {id:2,name:"สมหญิง แข็งแรง",team:"B",bus:"2",day:"Day1",session:"PM",shirt_size:"L",meal_type:"ฮาลาล",checked:false},
  ]);

  return (
    <div className="p-6 grid gap-6 font-sans">
      <motion.h1 className="text-2xl font-bold">Event Dashboard</motion.h1>
      <div className="grid grid-cols-4 gap-4">
        <UI.KPI t="ลงทะเบียนแล้ว" v={rows.length} />
        <UI.KPI t="เช็คอินแล้ว" v={rows.filter(r=>r.checked).length} />
        <UI.KPI t="ยังไม่มา" v={rows.filter(r=>!r.checked).length} />
        <UI.KPI t="ทีมทั้งหมด" v={[...new Set(rows.map(r=>r.team))].length} />
      </div>
      <div className={CARD}>
        <h2 className="text-lg font-semibold mb-2">ตารางผู้เข้าร่วม</h2>
        <table className="w-full text-sm border-collapse">
          <thead><tr>{["ชื่อ","ทีม","บัส","วัน","เช็คอิน"].map(l=>UI.th(l))}</tr></thead>
          <tbody>{rows.map(r=>(
            <tr key={r.id} className="border-t">
              {UI.td(r.name)}{UI.td(r.team)}{UI.td(r.bus)}{UI.td(r.day)}
              <td><UI.Btn v={r.checked?"success":"secondary"}>{r.checked?"✔":"✖"}</UI.Btn></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
