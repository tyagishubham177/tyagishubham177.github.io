// Public editorial summaries. No raw source documents or customer identifiers belong here.
export const studies = [
  {
    slug: "hospital-digitalisation", number: "01", category: "Healthcare · Workflow transformation",
    title: "From recorded care to usable information.", shortTitle: "Hospital medication workflows",
    description: "A mobile and cloud workflow for medication and cannula records, focused on earlier operational visibility without losing the exception path.",
    role: "Technical Lead · HCLTech", focus: "Workflow design, AI processing, cloud and interoperability", stage: "Beta → pilot, recalled", sourceVersion: "Hospital pack v0.2 · October 2026",
    image: "/assets/healthcare-architecture.png", imageAlt: "Warm architectural study, used as an editorial illustration",
    summary: "Nurses already recorded the information. The bigger problem was how long it took to become useful to hospital decision-makers.",
    boundary: "This account combines my recollection with an explicitly labelled reconstruction. The historical capture sequence, approval boundaries and measured impact are still being recovered.",
    sections: [
      {id:"context", label:"Context", title:"The record existed. The insight arrived late.", paragraphs:[
        "The starting workflow covered medication administered through drips or cannulas, along with monitoring cannula condition. Nurses recorded the information and senior nurses checked it. Paper storage, later digitisation and entry errors could separate the moment of care from the moment the record became usable for analysis.",
        "The product opportunity was not simply to replace paper with a screen. It was to shorten the path to dependable, usable information while understanding the repeated work performed by nurses, reviewers and back-office staff. Delays of months are recalled in the source account, but the baseline timing has not been independently recovered."
      ], facts:[{label:"Frontline user",value:"Nurses recording medication and cannula information"},{label:"Review user",value:"Senior nurses checking recorded information"},{label:"Insight user",value:"Hospital administrators and process owners"}]},
      {id:"contribution",label:"My contribution",title:"Technical leadership at the product boundary.",paragraphs:[
        "As Technical Lead at HCLTech, my work covered the AI stack, cloud workflow, app design and interoperability with hospital systems. I interacted with nurses and administrators around how the workflow should fit the hospital environment.",
        "Those contributions placed me at the intersection of workflow needs and technical feasibility. They do not establish that I held the formal Product Manager role or the final investment and release decision. The specific product choice I proposed, the alternative and the approving owner still need to be named."
      ],note:"Ownership boundary: technical and product-facing contribution; final product approval is not claimed."},
      {id:"decisions",label:"Trade-offs",title:"Automate processing. Keep errors visible.",paragraphs:[
        "The recalled delivered direction used mobile/cloud capture, automated processing, review of flagged records and a manual backup. Early incorrect suggestions needed subject-matter expert guidance. Automation therefore had an exception path; it was not autonomous clinical decision-making.",
        "Cloud was deployed according to my recollection. On-premises or hybrid deployment was considered, not shipped. Direct entry, photograph capture and extraction may have belonged to different stages; presenting them as one settled historical sequence would overstate the evidence."
      ],table:{caption:"A present-day comparison lens, not a recovered historical options log",heads:["Option","What it could improve","What must be tested"],rows:[
        ["Prompt manual digitisation","Earlier availability with limited product change","Net entry work and queue time"],
        ["Structured mobile entry","Data consistency at the moment of capture","Fit with nurse routines and incomplete records"],
        ["Photo plus extraction","Less repeated transcription","Review effort, incorrect fields and uncaptured forms"],
        ["Existing-system integration","Fewer duplicate data handoffs","Interface constraints and acknowledgements"]
      ]},note:"Illustrative prioritisation scores and unsupported scope or acceleration claims have been removed. The v0.2 pack does not support them as historical decisions or results."},
      {id:"workflow",label:"Workflow",title:"Make every handoff accountable.",paragraphs:[
        "Before the product, recording, checking, storage, entry and analysis were separated. The redesigned direction brought capture and processing closer to a cloud data flow while retaining a way to review exceptions and complete records manually.",
        "The sequence below is a public reconstruction of the reported capabilities. It is not an approved original PRD. Exact fields, flag thresholds, authorised reviewers, integration destinations and fallback reconciliation are still being established."
      ],flow:[{title:"Capture",body:"Record medication/cannula information. Direct-entry and photograph stages remain unresolved."},{title:"Process",body:"Automated processing prepares the data. Early suggestions needed SME correction."},{title:"Review",body:"Flagged records receive manual attention; low review volume alone cannot prove accuracy."},{title:"Use",body:"Cloud data becomes available for analysis. Record acknowledgements and exact timing need evidence."},{title:"Recover",body:"Manual backup completes work during failures; reconciliation ownership remains open."}]},
      {id:"measurement",label:"Measurement",title:"Earlier data is not the same as saved labour.",paragraphs:[
        "Shorter elapsed time can make information available sooner without releasing the same amount of staff time. The value model must measure both. It must also include records that never reached digital capture, corrections, review and manual completion—not only successfully processed records.",
        "A proposed primary measure is the share of all eligible records that become verified and usable within a defined window. It needs agreed start/end events, deduplication and an independent check of unflagged records. Numerical targets are not supplied as achieved outcomes."
      ],table:{caption:"Measurement design · proposed, not a results dashboard",heads:["Measure","What it answers","Evidence still needed"],rows:[
        ["Record-to-usable-data elapsed time","Did useful information arrive earlier?","Comparable timestamps, site mix and dates"],
        ["Net active minutes per record","Was total work actually reduced?","Capture, entry, review, correction and fallback time by role"],
        ["Verified share of eligible records","Did the workflow cover the whole cohort?","Eligible, missed, failed, manual and completed records"],
        ["Unflagged-record error rate","Did automation hide errors?","Independent reference checks and severity"],
        ["Fallback reconciliation","Could teams recover reliably?","Manual records linked back to the system"]
      ]},note:"Unverified timing, labour and volume estimates are withheld. Staff capacity, financial savings and patient outcomes are distinct claims requiring separate evidence."},
      {id:"delivery",label:"Delivery & learning",title:"A beta-to-pilot story, not a proven impact claim.",paragraphs:[
        "My recollection distinguishes two initial beta hospitals from three subsequent pilot hospitals. That describes delivery breadth, not production adoption or proven benefit. Site dates, active use, expansion gates and the actual go/no-go decision still need records.",
        "The strongest learning lead is that early incorrect suggestions required SME guidance. The precise error, corrective change, approval and follow-up check have not yet been recovered. I keep that gap visible instead of substituting a generic success story.",
        "An operational insight was also recalled: equipment purchase cost and downstream operational delay entered the same discussion once data was visible sooner. The mechanism, final purchasing decision and downstream result are unresolved. This is an insight lead, not proof of causal operational improvement."
      ],quote:"Digitisation matters when information reaches a decision-maker soon enough to be useful."},
      {id:"evidence",label:"Evidence boundary",title:"What this case can—and cannot—prove.",paragraphs:[
        "The v0.2 story supports a narrower, more concrete account of medication/cannula workflow work, engineering contribution, cloud deployment, exception handling and recalled beta/pilot stages. It does not establish measured labour savings, improved care, fully autonomous processing or end-to-end PM ownership.",
        "The next evidence to recover is one personally attributable product choice and its approver, one record traced through the delivered flow, and one permitted timing or quality sample. Original customer forms and internal documents are not distributed through this site."
      ],artifacts:["Role and workflow reconstruction","Capture and exception requirements snapshot","Value-metric design","Rollout and learning boundary"]}
    ]
  },
  {
    slug:"vascular-access",number:"02",category:"Enterprise healthcare · Configurable platform",
    title:"One platform. Many hospital workflows.",shortTitle:"Vascular-access management",
    description:"A configurable mobile and web platform designed to reduce vendor dependence without creating a separate codebase for every hospital.",
    role:"Lead Developer · Becton Dickinson",focus:"Shared mobile platform, configurable questionnaires and web administration",stage:"Multi-hospital deployment · source account",sourceVersion:"Vascular-access pack v0.1",
    image:"/assets/enterprise-architecture.png",imageAlt:"Modern architectural planes, used as an editorial illustration",
    summary:"The challenge was not just replacing a paid tool. It was giving hospital programmes control over change without fragmenting the product.",
    boundary:"Delivery and contribution are described from the existing source account. The option matrix, requirement snapshot and measurement design are retrospective reconstructions. Cost savings and cycle-time improvement remain unquantified.",
    sections:[
      {id:"context",label:"Context",title:"Vendor dependency slowed the learning loop.",paragraphs:[
        "Hospital programmes relied on third-party SaaS for vascular-access data collection and analysis. Recurring cost, limited configurability and slow questionnaire or analysis changes constrained how quickly a changing hospital need could become updated field collection and useful insight.",
        "The product challenge was to improve organisational control while maintaining continuity for frontline collectors. A visually new app alone would not solve questionnaire change latency; an app fork for every hospital could make the maintenance burden worse."
      ],facts:[{label:"Collection",value:"Frontline staff using the mobile product"},{label:"Administration",value:"Programme owners managing questionnaires and analysis"},{label:"Business constraint",value:"Vendor dependence versus internal build and run costs"}]},
      {id:"contribution",label:"My contribution",title:"Translate hospital needs into a reusable product.",paragraphs:[
        "As Lead Developer, I led core development and contributed to technical and product-design choices across the mobile and web experiences. Inputs came through hospital-provided research, existing questionnaires and recurring collector feedback.",
        "I helped translate those inputs into requirements, supported the shared-platform direction and influenced where familiar interactions should be retained. BD’s Product Owner and Product Manager owned product direction and customer alignment. I do not reframe hospital-supplied research as a study I personally conducted or claim sole investment authority."
      ],note:"Formal role: Lead Developer. Product-facing influence is kept separate from PM/PO ownership."},
      {id:"decisions",label:"Platform trade-offs",title:"Configuration creates leverage only within boundaries.",paragraphs:[
        "The selected platform direction used a shared, configurable cross-platform product rather than one-off hospital applications. Xamarin supported reuse in the mobile layer; web administration and analysis gave programme owners a central experience.",
        "The retrospective matrix makes the trade-offs explicit. It does not prove that every alternative was formally evaluated in this exact sequence. A credible build-versus-buy decision needs vendor total cost, internal investment, migration, ongoing maintenance and the time before the product becomes useful."
      ],table:{caption:"Retrospective decision frame · historical evaluation details still to validate",heads:["Approach","Benefit","Cost or constraint"],rows:[
        ["Keep third-party SaaS","Low immediate build effort and existing operations","Ongoing vendor cost and change dependency"],
        ["Separate hospital applications","High local fit","Fragmented maintenance and weak reuse"],
        ["Rigid shared product","A consistent, maintainable core","May reproduce the configurability problem"],
        ["Shared configurable platform","Common core with controlled hospital variation","Upfront build and configuration governance"]
      ]},note:"Familiar UX was a design intent to limit retraining risk—not a measured reduction in training. RICE numbers in the original pack were placeholders, not a recovered historical prioritisation record."},
      {id:"workflow",label:"Workflow",title:"Connect configuration to collection and analysis.",paragraphs:[
        "The core product linked configurable questionnaires, mobile collection, central data flow and web-based administration/analysis. The reconstructed sequence below explains how that model can shorten the organisation-controlled data loop.",
        "Questionnaire versioning, publishing authority, offline conflicts, migration and hospital access boundaries need specific acceptance evidence. The public case does not present the reconstructed PRD as proof that every proposed control shipped."
      ],flow:[{title:"Configure",body:"Programme owners define the questionnaire and permitted hospital variation."},{title:"Publish",body:"Approved configuration reaches the intended mobile users."},{title:"Collect",body:"Collectors use the familiar mobile workflow instead of a hospital-specific app fork."},{title:"Centralise",body:"Responses move to a common data path for web review and analysis."},{title:"Learn",body:"Insight informs the next questionnaire or workflow change; a complete historical loop is still to recover."}]},
      {id:"measurement",label:"Value & economics",title:"Measure the request-to-insight path—not only the build.",paragraphs:[
        "A useful measurement frame is the elapsed time from a validated questionnaire change request to usable field insight. Decomposing it into approval, configuration, collection and analysis prevents a faster first step from hiding a slower final one.",
        "The source account describes deployment across multiple hospital chains. It also reports a user count, but the meaning of registered, supported or active users is not reconciled, so that number is not used as an adoption metric here. Exact licence savings, turnaround changes and payback have not been recovered."
      ],table:{caption:"Proposed metric and business-case structure",heads:["Value question","Measure","Required proof"],rows:[
        ["Are changes faster?","Approved request → usable insight","Matched change records and queue timestamps"],
        ["Is the platform reusable?","Configuration changes versus code changes","Comparable requirements and maintenance effort"],
        ["Is it useful in practice?","Active collectors, eligible tasks and completions","Usage by hospital, role and period"],
        ["Does building pay off?","Avoided external cost minus incremental internal run cost","Finance baseline, build, migration, hosting, support and compliance"],
        ["Is trust maintained?","Data completeness, sync failures and support burden","Definitions, denominators and observed results"]
      ]}},
      {id:"delivery",label:"Delivery & learning",title:"The common core is a continuing product choice.",paragraphs:[
        "The source describes multi-hospital delivery and collaboration across PM/PO, engineering and hospital stakeholders. Exact rollout gates, cutover mechanics and one concrete feedback-to-release episode still need original records.",
        "The product lesson is a trade-off: a shared core becomes valuable only when local differences are supported deliberately. Unlimited customisation can recreate the same change burden under an internal engineering team. More configuration is not automatically more useful control.",
        "Advanced AI suggestions are a later opportunity in the pack, not a delivered capability. The reliable data loop and governance would need to earn that next step."
      ],quote:"The product value is control over the data-to-insight loop, not merely ownership of replacement code."},
      {id:"evidence",label:"Evidence boundary",title:"Platform delivery is supported. The value delta remains open.",paragraphs:[
        "The current materials support the contribution to a shared mobile/web platform, configurable collection and reduced vendor dependence. They do not yet prove the numerical savings, active adoption, faster turnaround or a downstream clinical result.",
        "The most useful next evidence is one dated questionnaire change before and after the platform, one request solved through configuration rather than a fork, and a precise recommendation/approval boundary. The matrices here are explanatory reconstructions, not original internal artifacts."
      ],artifacts:["Build-versus-buy comparison","Configurable-platform workflow","Reconstructed requirements snapshot","Change-latency and economics framework"]}
    ]
  },
  {
    slug:"diabetes-companion",number:"03",category:"Consumer healthcare · Experimentation",
    title:"Give people a useful reason to return.",shortTitle:"Diabetes companion experience",
    description:"Mobile engagement and experimentation work that balances practical utility, lightweight motivation and the reliability of a healthcare companion.",
    role:"Software Engineer II / Developer · Becton Dickinson",focus:"Mobile experience, A/B-test support and reliability guardrails",stage:"Existing product · experiment details to recover",sourceVersion:"Diabetes-app pack v0.1",
    image:"/assets/hero-illustration.png",imageAlt:"Hand-drawn curiosity and people illustration",
    summary:"A logging tool can collect activity without creating recurring value. Engagement needs to mean something useful to the person using it.",
    boundary:"The source supports engineering contribution and experimentation work. The behavioural models, experiment catalogue and proposed metric definitions are reconstructed—not recovered experiment results. No adherence, clinical or sales effect is claimed.",
    sections:[
      {id:"context",label:"Context",title:"A companion, not another attention-demanding app.",paragraphs:[
        "The existing mobile companion supported diabetes-related tracking, education and self-management. The working product problem was how to provide repeated value beyond passive logging, without adding distracting or burdensome mechanics to an already demanding routine.",
        "The app was a free companion within a broader healthcare ecosystem. That makes practical utility and user experience a more credible starting point than maximising session time. More opens can reflect reminders or friction; they do not automatically show improved self-management."
      ],facts:[{label:"User",value:"People using an existing diabetes companion"},{label:"Product tension",value:"Recurring utility versus notification and feature burden"},{label:"Constraint",value:"Reliability, clarity and trust alongside engagement"}]},
      {id:"contribution",label:"My contribution",title:"Support experiments that can answer a product question.",paragraphs:[
        "In a Software Engineer II / Developer role, I contributed mobile development, experimentation support and feature/interaction design input. The source account describes A/B-test implementation or support, engagement-focused changes and reliability considerations.",
        "The source also reports NPS improvement through testing, but the baseline, delta, respondent count and attribution are missing. I therefore describe the experimentation contribution without publishing a quantified lift or claiming ownership of every hypothesis and ship/stop decision."
      ],note:"Engineering contribution and product input are distinct from formal PM ownership. Specific experiment decision rights remain to be recovered."},
      {id:"decisions",label:"Experience trade-offs",title:"Utility first. Motivation has to earn its place.",paragraphs:[
        "The account describes a direction beyond passive notes: useful content such as food or recipe guidance, small goals and lightweight progress feedback. The precise shipped features and sequence still need confirmation against release records.",
        "The reconstructed reasoning separates logging friction from motivation. A cleaner form may reduce effort without adding a reason to return; more reminders can create fatigue; heavy gamification can optimise activity without creating useful value. Those are present-day product hypotheses, not a validated history of rejected experiments."
      ],table:{caption:"Reconstructed product lens · not a historical experiment outcome table",heads:["Direction","Potential utility","Risk to evaluate"],rows:[
        ["Simpler logging","Less effort for an existing task","Does not by itself establish a return motive"],
        ["Contextual useful content","Value in a relevant moment","Views may not become useful action"],
        ["Small goals and progress","A manageable next step","Burden, misinterpretation or discouragement after lapses"],
        ["More reminders","Prompted return","Opt-outs and interruption without lasting value"]
      ]},note:"COM-B, Kano and Impact–Effort in the preparation pack are learning frameworks. They are not claimed as the historical methods used by the team."},
      {id:"workflow",label:"Experience & experiments",title:"One hypothesis, one interpretable change.",paragraphs:[
        "The proposed experience is a low-burden loop: enter at a relevant moment, find one useful action, complete or log it, receive clear feedback and leave. The person’s attention is not an unlimited resource.",
        "The example below is a reconstructed experiment specification, not a test claimed to have run. It makes the evidence needed for an interpretable result visible instead of treating an attractive variant as a win."
      ],flow:[{title:"Question",body:"Would a useful next-action entry point improve meaningful repeat use versus logging-first navigation?"},{title:"Assignment",body:"Define eligible users and stable control/variant assignment before interpreting exposure."},{title:"Measure",body:"Link assignment, exposure, target action and return; set duration and analysis rules in advance."},{title:"Guard",body:"Watch crashes, sync failures, support, opt-outs and comprehension."},{title:"Decide",body:"Ship, iterate or stop from the actual outcome and guardrails—not from a visual preference."}]},
      {id:"measurement",label:"Metrics & guardrails",title:"An engagement win cannot hide a trust loss.",paragraphs:[
        "Weekly engagement appears in the existing source account as a target, alongside crash rate, sync failures and support escalations as guardrails. The exact engagement event, cohort, thresholds and results remain unresolved.",
        "A proposed stronger measure is weekly users completing at least one meaningful in-app action, with a clear numerator and eligible denominator. That is a product measurement proposal, not proof of medication adherence or improved health. Cohort retention can test durability; raw opens and time in app cannot establish it."
      ],table:{caption:"What an actual experiment record needs to contain",heads:["Layer","Measure","Interpretation boundary"],rows:[
        ["Primary behaviour","Defined target-action completion or repeat completion","Not passive opens and not a clinical outcome"],
        ["Experience","NPS with baseline and comparable respondents","No delta is currently published"],
        ["Reliability","Crash and sync-failure rates by exposure","Count events with fair denominators"],
        ["Customer burden","Support escalations, opt-outs and comprehension","Do not hide costs behind aggregate lift"],
        ["Durability","Cohort retention or active weeks","Distinguish sustained value from novelty"]
      ]},note:"No retention percentage, statistical significance, medication-adherence benefit or product-sales attribution is claimed. The source’s headline user count is not treated as the eligible experiment population."},
      {id:"delivery",label:"Learning & next step",title:"Recover one real test before adding a larger story.",paragraphs:[
        "The strongest next step is one actual experiment: the observed problem, my contribution, control and variant, assignment, exposure, duration, outcome, guardrails and decision. A null or stopped test would be as useful as a positive result if it changed the product direction.",
        "Personalised suggestions remain a future idea in the source account. Data quality, appropriate content governance and understandable feedback would need validation before that could become a delivered product capability.",
        "The transferable lesson is to distinguish useful repeated action from generic activity, and to make reliability part of the success definition. That is a product principle; it is not a substitute for recovering the historical results."
      ],quote:"Useful engagement is constrained by trust. More activity is not automatically more value."},
      {id:"evidence",label:"Evidence boundary",title:"Experimentation work, with the results kept honest.",paragraphs:[
        "The public story describes contribution to a mobile companion and experimentation support. It keeps missing outcome numbers, reconstructed hypotheses and unclear final decision ownership visible.",
        "Original experiment records, private telemetry and health-related data are not published. This page is a product-thinking account, not medical guidance or a claim that the app improved clinical care."
      ],artifacts:["Behaviour-versus-activity metric lens","Reconstructed experiment specification","Reliability and burden guardrails","Contribution and outcome boundaries"]}
    ]
  }
];

export const pathForStudy = study => `/work/${study.slug}/`;
export const getStudy = path => studies.find(study => path === pathForStudy(study));
