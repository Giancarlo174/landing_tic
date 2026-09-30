'use client'

import { useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronRight,
  Cloud,
  Cpu,
  Database,
  DollarSign,
  Gauge,
  Layers3,
  LockKeyhole,
  Network,
  RefreshCw,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Users,
} from 'lucide-react'

type Phase = {
  number: string
  title: string
  body: string
  tags: string[]
  detailTitle: string
  detailText: string
  deliverables: string[]
}

type Pillar = {
  number: string
  title: string
  body: string
  bullet1: string
  bullet2: string
  icon: typeof Server
  accent: string
  size: string
}

const phases: Phase[] = [
  {
    number: '01',
    title: 'Planificación',
    body: 'Alinear la inversión tecnológica con la estrategia del negocio antes de dimensionar capacidad.',
    tags: ['PETI', 'TCO / ROI', 'CapEx vs OpEx'],
    detailTitle: 'Entregables de Planificación Estratégica',
    detailText: 'Definición del Plan Estratégico de TI (PETI), presupuestación CapEx vs OpEx y justificación de retorno de inversión (ROI) antes de comprometer capital.',
    deliverables: ['Plan Estratégico de TI (PETI) a 3-5 años', 'Modelo financiero de Costo Total de Propiedad (TCO)', 'Matriz de capacidad y dimensionamiento de demanda']
  },
  {
    number: '02',
    title: 'Diseño',
    body: 'Convertir objetivos en una arquitectura resiliente, medible y sin puntos únicos de falla.',
    tags: ['TOGAF', 'HA / N+1', 'RPO · RTO'],
    detailTitle: 'Arquitectura Empresarial y Resiliencia',
    detailText: 'Modelado bajo marco TOGAF 10, esquemas de alta disponibilidad N+1 y planes de Continuidad (BCP) y Recuperación (DRP) eliminando puntos únicos de falla (SPOF).',
    deliverables: ['Planes de contingencia DRP (RTO < 1h, RPO < 15m)', 'Topología de red redundante sin SPOF', 'Catálogo de arquitectura técnica TOGAF']
  },
  {
    number: '03',
    title: 'Implementación',
    body: 'Desplegar con control, automatización y evidencia antes de mover una carga a producción.',
    tags: ['IaC', 'CAB / ITIL', 'Testing'],
    detailTitle: 'Despliegue Controlado y Automatización',
    detailText: 'Aprovisionamiento declarativo mediante Infraestructura como Código (IaC), comités de aprobación de cambios (CAB / ITIL) y pruebas de estrés/seguridad.',
    deliverables: ['Plantillas declarativas de Infraestructura como Código (IaC)', 'Comité de Gestión de Cambios (CAB / ITIL 4)', 'Pipelines CI/CD con pruebas de carga y escaneo CVE']
  },
  {
    number: '04',
    title: 'Evaluación',
    body: 'Medir el resultado, auditar el control y cerrar el ciclo con mejora continua.',
    tags: ['COBIT 2019', 'DORA', 'PDCA / PIR'],
    detailTitle: 'Auditoría de Gobierno y Métricas DORA',
    detailText: 'Evaluación de madurez COBIT 2019, telemetría DORA (Deployment Frequency, MTTR), cálculo real de disponibilidad y Revisiones Post-Implementación (PIR).',
    deliverables: ['Informe de auditoría de gobernanza COBIT 2019 / CMMI', 'Tablero de métricas DORA (MTTR < 15 min, Change Failure < 5%)', 'Revisión Post-Implementación (PIR) y ciclo PDCA']
  },
]

const pillars: Pillar[] = [
  {
    number: '01',
    title: 'Activos bajo control',
    body: 'ITAM, CMDB y SAM para conocer qué existe, quién lo usa y qué licencia lo respalda.',
    bullet1: 'CMDB con mapeo de dependencias de servicios.',
    bullet2: 'Auditoría SAM para evitar sanciones millonarias.',
    icon: Server,
    accent: 'bg-[#e8f0ff]',
    size: 'md:col-span-7'
  },
  {
    number: '02',
    title: 'Observabilidad',
    body: 'MELT + OpenTelemetry para detectar cuellos de botella antes de que afecten al usuario.',
    bullet1: 'Telemetría unificada: Métricas, Eventos, Logs y Trazas.',
    bullet2: 'FinOps: supresión de capacidad ociosa y sobrecostos.',
    icon: BarChart3,
    accent: 'bg-[#edf7f2]',
    size: 'md:col-span-5'
  },
  {
    number: '03',
    title: 'Zero Trust',
    body: 'Verificar siempre. MFA, microsegmentación y backups inmutables 3-2-1.',
    bullet1: 'Autenticación multifactor y menor privilegio.',
    bullet2: 'Copias inmutables con pruebas periódicas anti-ransomware.',
    icon: ShieldCheck,
    accent: 'bg-[#f4f0ff]',
    size: 'md:col-span-5'
  },
  {
    number: '04',
    title: 'Talento continuo',
    body: 'Security awareness, up-skilling y postmortems sin culpables para mitigar el factor humano.',
    bullet1: 'Simulacros periódicos contra phishing e ingeniería social.',
    bullet2: 'Recualificación técnica en Cloud y cultura Blameless.',
    icon: Users,
    accent: 'bg-[#fff3e8]',
    size: 'md:col-span-7'
  },
  {
    number: '05',
    title: 'Integración',
    body: 'APIs, eventos y Patrón Estrangulador para modernizar sistemas legados sin apagar operaciones.',
    bullet1: 'API Gateway centralizado con contratos OpenAPI.',
    bullet2: 'Arquitecturas dirigidas por eventos (EDA) y desacople gradual.',
    icon: Network,
    accent: 'bg-[#eaf7f8]',
    size: 'md:col-span-7'
  },
  {
    number: '06',
    title: 'Tecnología responsable',
    body: 'Privacidad por diseño, Green IT y gestión RAEE como criterios directivos de arquitectura.',
    bullet1: 'Eficiencia energética en centros de datos (PUE < 1.25).',
    bullet2: 'Disposición ecológica certificada de residuos electrónicos WEEE.',
    icon: Sparkles,
    accent: 'bg-[#eef4ea]',
    size: 'md:col-span-5'
  },
]

const frameworks = [
  ['COBIT 2019', 'Gobernanza, alineación estratégica y control directivo', 'ISACA'],
  ['ITIL 4', 'Gestión de servicios de TI, entrega de valor y ciclo de cambio', 'AXELOS'],
  ['ISO/IEC 27001', 'Sistema de gestión de seguridad de la información (SGSI)', 'ISO'],
  ['TOGAF 10', 'Marco metodológico para arquitectura empresarial', 'The Open Group'],
  ['ISO 20000-1', 'Calidad en la gestión y entrega de servicios TIC', 'ISO'],
  ['NIST CSF', 'Gestión de riesgos cibernéticos y resiliencia operacional', 'NIST'],
]

const academicReferences = [
  {
    source: 'ScienceDirect / Elsevier',
    author: 'Henderson, J. C., & Venkatraman, N.',
    year: '1993',
    title: 'Strategic Alignment: Leveraging information technology for transforming organizations.',
    journal: 'IBM Systems Journal, 32(1), 4-16.'
  },
  {
    source: 'IEEE Xplore',
    author: 'Avizienis, A., Laprie, J.-C., Randell, B., & Landwehr, C.',
    year: '2004',
    title: 'Basic concepts and taxonomy of dependable and secure computing.',
    journal: 'IEEE Transactions on Dependable and Secure Computing, 1(1), 11-33.'
  },
  {
    source: 'ACM Digital Library',
    author: 'Forsgren, N., Humble, J., & Kim, G.',
    year: '2018',
    title: 'Accelerate: The Science of Lean Software and DevOps: Building and Scaling High Performing Technology Organizations.',
    journal: 'IT Revolution Press / ACM Queue.'
  },
  {
    source: 'ISACA Publications',
    author: 'ISACA',
    year: '2019',
    title: 'COBIT 2019 Framework: Governance and Management Objectives.',
    journal: 'Information Systems Audit and Control Association (ISACA).'
  },
  {
    source: 'NIST Standards',
    author: 'Rose, S., Borchert, O., Mitchell, S., & Connelly, S.',
    year: '2020',
    title: 'Zero Trust Architecture (NIST Special Publication 800-207).',
    journal: 'National Institute of Standards and Technology.'
  },
  {
    source: 'The Open Group',
    author: 'The Open Group',
    year: '2022',
    title: 'The TOGAF Standard, 10th Edition: Enterprise Architecture Methodology.',
    journal: 'Van Haren Publishing.'
  },
]

export default function Page() {
  const [capacity, setCapacity] = useState(72)
  const [activePhase, setActivePhase] = useState(0)
  const [consoleTab, setConsoleTab] = useState<'capacity' | 'tco'>('capacity')
  const [checks, setChecks] = useState([true, true, true, false])
  const availability = useMemo(() => (98.5 + capacity * 0.015).toFixed(2), [capacity])
  const maturity = checks.filter(Boolean).length * 25

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] text-[#091e3a] selection:bg-[#2563eb] selection:text-white">
      {/* NAVEGACIÓN SUPERIOR */}
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-6 lg:px-10" aria-label="Navegación principal">
        <a href="#inicio" className="flex items-center gap-3 font-semibold tracking-tight">
          <span className="grid size-9 place-items-center rounded-[11px] bg-[#091e3a] text-white">
            <Layers3 size={18} />
          </span>
          <span className="text-sm font-bold tracking-tight">
            Gerencia<span className="text-[#2563eb]">.TIC</span>
          </span>
        </a>
        <div className="hidden items-center gap-8 text-[13px] font-medium text-[#5e6d81] md:flex">
          <a href="#modelo" className="transition-colors hover:text-[#2563eb]">Modelo SAM</a>
          <a href="#ciclo" className="transition-colors hover:text-[#2563eb]">Ciclo de vida</a>
          <a href="#pilares" className="transition-colors hover:text-[#2563eb]">6 Pilares</a>
          <a href="#marcos" className="transition-colors hover:text-[#2563eb]">Marcos</a>
          <a href="#evaluacion" className="transition-colors hover:text-[#2563eb]">Evaluación</a>
          <a href="#fuentes" className="transition-colors hover:text-[#2563eb]">Bases Académicas</a>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs font-medium text-[#5e6d81] sm:inline">Giancarlo Santillana</span>
          <span className="rounded-lg border border-slate-200/90 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs">
            Lab #4
          </span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="inicio" className="relative mx-auto grid max-w-[1240px] gap-12 px-6 pb-24 pt-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-10 lg:pb-32 lg:pt-20">
        <div className="absolute -left-32 top-10 -z-0 size-[520px] rounded-full bg-[#e8f0ff] opacity-70 blur-3xl" />
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-lg border border-blue-100 bg-blue-50/70 px-3.5 py-1.5 text-xs font-semibold text-blue-700">
            <span className="size-2 rounded-full bg-blue-600" />
            <span>Laboratorio #4 &bull; Gerencia de Recursos de TIC &bull; Giancarlo Santillana</span>
          </div>

          <h1 className="max-w-[720px] text-[clamp(3rem,6vw,5.6rem)] font-bold leading-[1.04] tracking-tight text-[#091e3a]">
            La tecnología no se administra.<br />
            <span className="text-[#2563eb]">Se dirige.</span>
          </h1>

          <p className="mt-7 max-w-[550px] text-base leading-relaxed text-[#5e6d81] md:text-lg">
            Una mirada ejecutiva y metodológica a la gerencia de infraestructura TIC: transformar hardware, personas, ciberseguridad y datos en resiliencia y valor estratégico medible para la organización.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#ciclo"
              className="group flex min-h-12 items-center gap-3 rounded-xl bg-[#2563eb] px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
            >
              Explorar el ciclo de vida <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#fuentes"
              className="flex items-center gap-2 text-sm font-semibold text-[#5e6d81] transition-colors hover:text-[#2563eb]"
            >
              Ver citas académicas <ArrowDownRight size={16} />
            </a>
          </div>

          <div className="mt-14 flex gap-8 border-t border-[#dbe3ed] pt-6 text-xs text-[#718096]">
            <div>
              <strong className="block text-2xl font-bold tracking-tight text-[#091e3a]">4</strong>
              Fases del ciclo
            </div>
            <div>
              <strong className="block text-2xl font-bold tracking-tight text-[#091e3a]">6</strong>
              Pilares críticos
            </div>
            <div>
              <strong className="block text-2xl font-bold tracking-tight text-[#091e3a]">99.99%</strong>
              Disponibilidad SLA
            </div>
            <div>
              <strong className="block text-2xl font-bold tracking-tight text-[#091e3a]">&lt; 1.25</strong>
              PUE Green IT
            </div>
          </div>
        </div>

        {/* CONSOLA OPERATIVA INTERACTIVA (VERCEL COCKPIT STYLE) */}
        <div className="relative z-10 rounded-[28px] border border-[#dbe3ed] bg-white p-5 shadow-[0_24px_70px_-38px_rgba(9,30,58,.35)] lg:rotate-[1deg]">
          <div className="flex items-center justify-between border-b border-[#edf1f5] pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="size-2 rounded-full bg-emerald-500" />
              Consola de Operaciones TIC
            </div>
            <div className="flex rounded-lg bg-[#f0f4f8] p-1 text-[11px] font-medium text-[#5e6d81]">
              <button
                type="button"
                onClick={() => setConsoleTab('capacity')}
                className={`rounded-md px-3 py-1.5 transition-all ${consoleTab === 'capacity' ? 'bg-white text-[#091e3a] font-semibold shadow-xs' : 'hover:text-[#091e3a]'}`}
              >
                Capacidad
              </button>
              <button
                type="button"
                onClick={() => setConsoleTab('tco')}
                className={`rounded-md px-3 py-1.5 transition-all ${consoleTab === 'tco' ? 'bg-white text-[#091e3a] font-semibold shadow-xs' : 'hover:text-[#091e3a]'}`}
              >
                FinOps / TCO
              </button>
            </div>
          </div>

          {/* VISTA 1: CAPACIDAD OPERATIVA */}
          {consoleTab === 'capacity' ? (
            <div>
              <div className="grid grid-cols-2 gap-3 py-4">
                <div className="rounded-2xl bg-[#f5f8fc] p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8a98a9]">Disponibilidad SLA</span>
                  <strong className="mt-1 block text-3xl font-bold tracking-tight text-[#091e3a]">{availability}%</strong>
                  <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <ArrowUpRight size={13} /> Alta Disponibilidad N+1
                  </span>
                </div>
                <div className="rounded-2xl bg-[#091e3a] p-4 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#b9c6d8]">Riesgo Operativo</span>
                  <strong className="mt-1 block text-3xl font-bold tracking-tight text-white">Bajo</strong>
                  <span className="mt-1 block text-xs text-[#9fb3cb]">Zero Trust + DRP &lt; 1h</span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#edf1f5] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#091e3a]">Demanda y Carga de Cómputo</span>
                  <span className="text-xs font-bold text-[#2563eb]">{capacity}%</span>
                </div>
                <div className="flex h-24 items-end gap-1.5">
                  {[34, 51, 42, 68, 54, 72, 62, 77, 68, 85, 72, capacity].map((n, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-[#dbe8ff] transition-all duration-300"
                      style={{ height: `${n}%`, backgroundColor: i === 11 ? '#2563eb' : undefined }}
                    />
                  ))}
                </div>
                <input
                  aria-label="Ajustar utilización de capacidad"
                  type="range"
                  min="20"
                  max="96"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="mt-4 w-full accent-[#2563eb]"
                />
                <div className="mt-2 flex justify-between text-[11px] font-medium text-slate-400">
                  <span>00:00 (Mínimo)</span>
                  <span>12:00 (Pico)</span>
                  <span className="font-semibold text-blue-600">ACTUAL</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl bg-[#eef4ff] px-4 py-2.5 text-xs">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  <Gauge size={15} className="text-[#2563eb]" />
                  Telemetría MELT
                </span>
                <span className="font-semibold text-[#2563eb]">Capacidad elástica conforme</span>
              </div>
            </div>
          ) : (
            /* VISTA 2: SIMULADOR TCO CAPEX VS OPEX */
            <div className="py-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">On-Premise (CapEx)</span>
                  <strong className="mt-1 block text-2xl font-bold tracking-tight text-[#091e3a]">$58,000</strong>
                  <span className="text-xs text-[#64748b]">Hardware inicial + $850/mes energía</span>
                </div>
                <div className="rounded-2xl border border-[#2563eb]/20 bg-[#eff6ff] p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2563eb]">Cloud Híbrida (OpEx)</span>
                  <strong className="mt-1 block text-2xl font-bold tracking-tight text-[#2563eb]">$1,420<span className="text-xs font-normal">/mes</span></strong>
                  <span className="text-xs text-[#2563eb]/80">Pago por consumo elástico</span>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-[#edf1f5] p-4">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#091e3a]">Retorno de Inversión (ROI a 3 años)</span>
                  <span className="font-bold text-emerald-600">+34% Eficiencia FinOps</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#68788c]">
                  La migración hacia modelos elásticos OpEx reduce la inversión de capital ocioso en un 60% y transfiere el mantenimiento de hardware al proveedor de nube bajo acuerdos SLA de 99.99%.
                </p>
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                  <TrendingDown size={14} />
                  <span>Eliminación de sobrecostos por capacidad ociosa no utilizada.</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl bg-[#091e3a] px-4 py-2.5 text-xs text-white">
                <span className="flex items-center gap-2 font-medium">
                  <DollarSign size={15} className="text-[#38bdf8]" />
                  Alineación Financiera
                </span>
                <span className="font-semibold text-emerald-400">Auditoría FinOps Verificada</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECCIÓN 1: MODELO DE ALINEACIÓN ESTRATÉGICA (SAM) */}
      <section id="modelo" className="border-y border-[#e1e8f0] bg-white">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-6 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-28">
          <div>
            <span className="eyebrow">01 / cambio de perspectiva</span>
            <h2 className="mt-5 max-w-md text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
              De centro de costos a <span className="text-[#2563eb]">motor de valor.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#68788c]">
              Basado en el <strong>Strategic Alignment Model (SAM)</strong> de Henderson & Venkatraman (1993), la TI empresarial no puede operar aislada: la infraestructura debe responder a las decisiones de negocio.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="border-l-2 border-[#dbe3ed] pl-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8a98a9]">Antes / Break-fix</span>
              <h3 className="mt-3 text-lg font-bold text-[#091e3a]">TI reactiva (Soporte tradicional)</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#68788c]">
                Resolver incidentes aislados conforme ocurren, adquirir infraestructura sin análisis de demanda y medir el desempeño únicamente por la ausencia de quejas del usuario.
              </p>
            </div>
            <div className="border-l-2 border-[#2563eb] pl-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2563eb]">Ahora / SAM &amp; COBIT</span>
              <h3 className="mt-3 text-lg font-bold text-[#091e3a]">Gerencia de TIC estratégica</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#68788c]">
                Integrar infraestructura, gobernanza y finanzas de modo que cada servidor, enlace o servicio en la nube acelere una ventaja competitiva y reduzca el riesgo operativo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: CICLO DE VIDA (4 FASES INTERACTIVAS CON DETALLE DINÁMICO) */}
      <section id="ciclo" className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">02 / ciclo de vida metodológico</span>
            <h2 className="mt-5 text-4xl font-bold tracking-tight lg:text-5xl">Gestionar es cerrar el ciclo.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#68788c]">
            Haga clic en cualquiera de las 4 fases para visualizar sus entregables formales de ingeniería y auditoría directiva.
          </p>
        </div>

        {/* 4 BOTONES DE FASES */}
        <div className="grid gap-3 md:grid-cols-4">
          {phases.map((phase, i) => (
            <button
              key={phase.number}
              type="button"
              onClick={() => setActivePhase(i)}
              className={`group min-h-[220px] rounded-[22px] border p-6 text-left transition-all ${
                activePhase === i
                  ? 'border-[#2563eb] bg-[#091e3a] text-white shadow-[0_18px_30px_-20px_#091e3a]'
                  : 'border-[#dbe3ed] bg-white hover:-translate-y-1 hover:border-[#a9c4f7]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${activePhase === i ? 'text-blue-200' : 'text-[#2563eb]'}`}>
                  Fase {phase.number}
                </span>
                <ChevronRight size={16} className={activePhase === i ? 'text-blue-200' : 'text-[#a8b4c2]'} />
              </div>
              <h3 className="mt-8 text-xl font-bold tracking-tight">{phase.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${activePhase === i ? 'text-slate-300' : 'text-[#68788c]'}`}>
                {phase.body}
              </p>
              <div className={`mt-4 text-xs font-medium ${activePhase === i ? 'text-blue-200' : 'text-slate-500'}`}>
                <span>{phase.tags.join(' • ')}</span>
              </div>
            </button>
          ))}
        </div>

        {/* DETALLE DINÁMICO DE LA FASE ACTIVA */}
        <div className="mt-6 rounded-[24px] border border-[#dbe3ed] bg-white p-6 shadow-xs md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-[#edf1f5] pb-5 md:flex-row md:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Detalle metodológico &bull; Fase {phases[activePhase].number}
              </span>
              <h4 className="mt-1 text-2xl font-bold tracking-tight text-[#091e3a]">
                {phases[activePhase].detailTitle}
              </h4>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50/70 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <span className="size-1.5 rounded-full bg-blue-600" />
              <span>Estándar COBIT 2019 &bull; ITIL 4</span>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-[#5e6d81]">
            {phases[activePhase].detailText}
          </p>

          <div className="mt-6 grid gap-3.5 sm:grid-cols-3">
            {phases[activePhase].deliverables.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-slate-50/60 p-4 transition-all hover:border-blue-300 hover:bg-white hover:shadow-xs"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-blue-600">0{idx + 1}</span>
                  <span className="text-[11px] font-medium text-slate-400">Entregable</span>
                </div>
                <p className="mt-3 text-xs font-semibold leading-relaxed text-[#091e3a]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FÓRMULA MATEMÁTICA DE DISPONIBILIDAD OPERATIVA */}
        <div className="mt-8 grid gap-6 rounded-[24px] bg-[#edf4ff] p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2563eb]">
              <RefreshCw size={14} /> Métrica Matemática de Disponibilidad Operativa
            </div>
            <div className="mt-4 flex flex-wrap items-baseline gap-2 text-xl font-bold text-[#091e3a] md:text-2xl">
              <span>A =</span>
              <span className="inline-flex flex-col text-center text-sm leading-5 font-semibold">
                <span className="border-b border-[#091e3a] px-2 font-bold">MTBF</span>
                <span className="px-2">MTBF + MTTR</span>
              </span>
              <span>&times; 100</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#5e6d81]">
              <strong>MTBF:</strong> Tiempo medio entre fallas (Mean Time Between Failures). &bull; <strong>MTTR:</strong> Tiempo medio de reparación (Mean Time to Repair).
            </p>
          </div>
          <div className="rounded-2xl bg-white px-6 py-4 shadow-xs">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#8a98a9]">Ejemplo en operación</span>
            <strong className="mt-1 block text-3xl font-bold tracking-tight text-[#2563eb]">99.99%</strong>
            <span className="text-[11px] text-[#68788c]">MTBF: 720h (30 días) &bull; MTTR: 0.07h (4.3 min)</span>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: LOS 6 PILARES DE INFRAESTRUCTURA TIC (BENTO GRID) */}
      <section id="pilares" className="bg-[#091e3a] text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow eyebrow-dark">03 / capacidades críticas</span>
              <h2 className="mt-5 max-w-xl text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
                Seis pilares para que lo crítico siga funcionando.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#aabbd0]">
              La infraestructura es un sistema socio-técnico: hardware, software, ciberseguridad y personas integradas en una misma estrategia.
            </p>
          </div>

          <div className="grid gap-3.5 md:grid-cols-12">
            {pillars.map(({ number, title, body, bullet1, bullet2, icon: Icon, accent, size }) => (
              <article
                key={number}
                className={`${size} group flex flex-col justify-between rounded-[22px] border border-white/10 bg-white/[.06] p-6 transition-colors hover:bg-white/[.1] md:min-h-[220px]`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className={`grid size-10 place-items-center rounded-xl ${accent} text-[#091e3a]`}>
                      <Icon size={19} />
                    </div>
                    <span className="text-xs font-semibold text-[#7890ab]">Pilar {number}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#aabbd0]">{body}</p>
                </div>

                <div className="mt-5 border-t border-white/10 pt-3 text-xs text-[#9fb3cb]">
                  <div className="flex items-center gap-2 py-0.5">
                    <span className="size-1 rounded-full bg-[#38bdf8]" />
                    <span>{bullet1}</span>
                  </div>
                  <div className="flex items-center gap-2 py-0.5">
                    <span className="size-1 rounded-full bg-[#38bdf8]" />
                    <span>{bullet2}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: MATRIZ DE MARCOS INTERNACIONALES */}
      <section id="marcos" className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <span className="eyebrow">04 / gobernanza &amp; cumplimiento</span>
            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
              Marcos que convierten intención en control.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#68788c]">
              No son sellos decorativos ni teoría abstracta. Son sistemas de decisión estandarizados internacionalmente para reducir ambigüedad y hacer auditable el valor de la infraestructura.
            </p>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-[#dbe3ed] bg-white shadow-xs">
            {frameworks.map(([name, purpose, source]) => (
              <div
                key={name}
                className="grid grid-cols-[1.1fr_1fr_auto] items-center gap-3 border-b border-[#edf1f5] px-5 py-5 last:border-b-0 md:grid-cols-[1fr_1.3fr_auto] md:px-7"
              >
                <span className="font-semibold text-[#091e3a]">{name}</span>
                <span className="text-sm text-[#68788c]">{purpose}</span>
                <span className="text-xs font-bold text-blue-600">{source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: EVALUADOR DE MADUREZ INTERACTIVO */}
      <section id="evaluacion" className="border-t border-[#e1e8f0] bg-[#f0f4f8]">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-6 py-20 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:py-28">
          <div>
            <span className="eyebrow">05 / evaluación de madurez</span>
            <h2 className="mt-5 max-w-lg text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
              ¿Qué tan preparada está la infraestructura?
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#68788c]">
              Active o desactive los controles que existen en la organización para calcular el nivel de madurez operativa y resiliencia en tiempo real.
            </p>

            <div className="mt-8 flex items-center gap-5">
              <div
                className="relative size-24 shrink-0 rounded-full transition-all"
                style={{ background: `conic-gradient(#2563eb ${maturity}%, #dbe3ed 0)` }}
              >
                <div className="absolute inset-2 grid place-items-center rounded-full bg-[#f0f4f8]">
                  <strong className="text-2xl font-bold tracking-tight text-[#091e3a]">{maturity}%</strong>
                </div>
              </div>
              <div>
                <span className="block font-bold text-[#091e3a]">Madurez COBIT / CMMI</span>
                <span className="text-sm text-[#68788c]">
                  {maturity === 100
                    ? 'Nivel 5: Optimizado & Resiliente total.'
                    : maturity >= 50
                    ? 'Nivel 3: Definido con controles formales.'
                    : 'Nivel 1: Inicial / Reactivo. Requiere intervención.'}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#dbe3ed] bg-white p-6 shadow-xs md:p-8">
            <div className="mb-6 flex items-center justify-between border-b border-[#edf1f5] pb-5">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-[#eef4ff] text-[#2563eb]">
                  <ShieldCheck size={17} />
                </span>
                <div>
                  <strong className="block text-sm text-[#091e3a]">Checklist de Resiliencia TIC</strong>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8a98a9]">
                    Auditoría de 4 Controles Críticos
                  </span>
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Interactivo
              </span>
            </div>

            {[
              'Backups inmutables 3-2-1 con pruebas de restauración periódicas',
              'Autenticación multifactor (MFA) y microsegmentación de red',
              'Pruebas y simulacros de DRP con RPO < 15m y RTO < 1h',
              'Cultura Blameless Postmortem y análisis de causas raíz',
            ].map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() =>
                  setChecks((prev) => prev.map((checked, index) => (index === i ? !checked : checked)))
                }
                className="flex min-h-12 w-full items-center justify-between border-b border-[#f0f3f7] py-2 text-left text-sm last:border-b-0 hover:bg-[#fafcff]"
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`grid size-5 place-items-center rounded-md border transition-colors ${
                      checks[i] ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-[#c9d4e1] text-transparent'
                    }`}
                  >
                    <Check size={13} />
                  </span>
                  <span className="text-[#334155]">{label}</span>
                </span>
                <span className="text-xs font-semibold text-[#8a98a9]">0{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: REFERENCIAS Y BASES DE DATOS ACADÉMICAS */}
      <section id="fuentes" className="border-t border-[#e1e8f0] bg-white">
        <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">06 / rigor académico</span>
              <h2 className="mt-5 text-4xl font-bold tracking-tight lg:text-5xl">
                Bases de datos académicas y estándares.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#68788c]">
              Investigación en bases indexadas de prestigio internacional.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {academicReferences.map((ref, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-[20px] border border-[#e2e8f0] bg-[#f8fafc] p-6 transition-all hover:-translate-y-1 hover:border-[#2563eb]/40 hover:bg-white hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md border border-blue-100 bg-blue-50/70 px-2.5 py-1 text-xs font-bold text-blue-700">
                      {ref.source}
                    </span>
                    <span className="text-xs font-medium text-slate-400">{ref.year}</span>
                  </div>
                  <h4 className="mt-4 text-sm font-bold text-[#091e3a]">{ref.title}</h4>
                  <p className="mt-2 text-xs italic text-[#5e6d81]">{ref.author}</p>
                </div>
                <div className="mt-4 border-t border-[#edf1f5] pt-3 text-[11px] text-[#8a98a9]">
                  {ref.journal}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER ACADÉMICO */}
      <footer className="border-t border-[#e1e8f0] bg-[#f7f9fc] py-12 text-xs text-[#718096]">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-6 px-6 md:flex-row md:items-center lg:px-10">
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-lg bg-[#091e3a] text-white">
              <Layers3 size={16} />
            </span>
            <div>
              <strong className="block text-sm text-[#091e3a]">Giancarlo Santillana</strong>
              <span>Laboratorio #4 &bull; Gerencia de Recursos de Tecnología de Información y Comunicación</span>
            </div>
          </div>
          <div className="text-left md:text-right">
            <span className="block font-semibold text-[#091e3a]">Gobernanza &amp; Arquitectura Empresarial</span>
            <span className="text-[#5e6d81]">Alineado a COBIT 2019, ITIL 4 y TOGAF &bull; Semestre 2026</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
