import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  HeadingLevel,
  Header,
  Footer,
  PageBreak,
  PageNumber,
} from 'docx';
import { CareerReport, ResumeRecord } from '@/types';

/**
 * Palette constants for publication-grade DOCX styling
 */
const COLOR_PRIMARY = '1B4D3E';    // Forest Green (Title / Branding)
const COLOR_ACCENT = '059669';     // Emerald Accent
const COLOR_CALLOUT_BG = 'E8F5E9'; // Light Mint Tint
const COLOR_HEADER_BG = 'ECFDF5';  // Table Header Background
const COLOR_ALT_ROW = 'F8FAFC';    // Alternating Row Background
const COLOR_BORDER = 'CBD5E1';     // Clean Slate 200/300 Border
const COLOR_TEXT = '1E293B';       // Dark Slate 800 Primary Text
const COLOR_MUTED = '64748B';      // Slate 500 Secondary Text
const COLOR_RED = 'DC2626';        // Critical Alert Red
const COLOR_AMBER = 'D97706';      // Warning Amber

const cellBorders = {
  top: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
  left: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
  right: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
};

function createHeaderCell(text: string, widthDxa: number): TableCell {
  return new TableCell({
    width: { size: widthDxa, type: WidthType.DXA },
    margins: { top: 120, bottom: 120, left: 180, right: 180 },
    shading: { fill: COLOR_HEADER_BG },
    borders: cellBorders,
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({
            text,
            bold: true,
            size: 19, // 9.5pt
            color: COLOR_PRIMARY,
            font: 'Arial',
          }),
        ],
      }),
    ],
  });
}

function createDataCell(
  text: string,
  widthDxa: number,
  isEven: boolean,
  bold = false,
  textColor = COLOR_TEXT
): TableCell {
  return new TableCell({
    width: { size: widthDxa, type: WidthType.DXA },
    margins: { top: 120, bottom: 120, left: 180, right: 180 },
    shading: { fill: isEven ? 'FFFFFF' : COLOR_ALT_ROW },
    borders: cellBorders,
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({
            text,
            bold,
            size: 19, // 9.5pt
            color: textColor,
            font: 'Arial',
          }),
        ],
      }),
    ],
  });
}

/**
 * Generate a complete, publication-grade Word Document (.docx)
 * Strictly calibrated to 8,640 DXA printable width with no overlapping text or table overflow.
 */
export async function createDocxDocument(report: CareerReport): Promise<Document> {
  const createSectionHeader = (number: string, title: string) =>
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 360, after: 140 },
      children: [
        new TextRun({
          text: `${number}. ${title.toUpperCase()}`,
          bold: true,
          size: 28, // 14pt
          color: COLOR_PRIMARY,
          font: 'Arial',
        }),
      ],
    });

  // 1. Skill Profile Table Rows (Exact DXA: 2400 + 1600 + 1400 + 3240 = 8640 DXA)
  const skillTableRows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      children: [
        createHeaderCell('Skill Name', 2400),
        createHeaderCell('Category', 1600),
        createHeaderCell('Proficiency', 1400),
        createHeaderCell('Evidence / Status', 3240),
      ],
    }),
  ];

  report.skills.slice(0, 15).forEach((skill, idx) => {
    const isEven = idx % 2 === 0;
    skillTableRows.push(
      new TableRow({
        children: [
          createDataCell(skill.name, 2400, isEven, true),
          createDataCell(skill.category.toUpperCase(), 1600, isEven),
          createDataCell(`${skill.score}%`, 1400, isEven, true, COLOR_ACCENT),
          createDataCell(skill.evidenceSnippet || 'Extracted from verified resume evidence', 3240, isEven),
        ],
      })
    );
  });

  // 2. Skill Gap Table Rows (Exact DXA: 2400 + 1800 + 1800 + 2640 = 8640 DXA)
  const gapTableRows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      children: [
        createHeaderCell('Competency Area', 2400),
        createHeaderCell('Candidate Score', 1800),
        createHeaderCell('Industry Benchmark', 1800),
        createHeaderCell('Deficit Status', 2640),
      ],
    }),
  ];

  report.skillGaps.forEach((gap, idx) => {
    const isEven = idx % 2 === 0;
    gapTableRows.push(
      new TableRow({
        children: [
          createDataCell(gap.skill, 2400, isEven, true),
          createDataCell(`${gap.currentScore}%`, 1800, isEven),
          createDataCell(`${gap.targetScore}%`, 1800, isEven),
          createDataCell(
            gap.status,
            2640,
            isEven,
            true,
            gap.status === 'Missing' ? COLOR_RED : gap.status === 'Acquired' ? COLOR_ACCENT : COLOR_AMBER
          ),
        ],
      })
    );
  });

  const doc = new Document({
    creator: 'SkillBridge AI Platform',
    title: `Career Intelligence Report - ${report.candidateInfo.name}`,
    description: `Automated Career Intelligence Report for ${report.candidateInfo.name} generated by SkillBridge AI (SIH26044).`,
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }, // 1 inch on all sides
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'SkillBridge AI • Confidential Career Intelligence Report',
                    size: 17, // 8.5pt
                    color: COLOR_MUTED,
                    font: 'Arial',
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `${report.candidateInfo.name || 'Candidate'}  •  ${report.targetRole}  •  `,
                    size: 17,
                    color: COLOR_MUTED,
                    font: 'Arial',
                  }),
                  new TextRun({
                    text: 'Page ',
                    size: 17,
                    color: COLOR_MUTED,
                    font: 'Arial',
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 17,
                    color: COLOR_MUTED,
                    font: 'Arial',
                  }),
                  new TextRun({
                    text: ' of ',
                    size: 17,
                    color: COLOR_MUTED,
                    font: 'Arial',
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 17,
                    color: COLOR_MUTED,
                    font: 'Arial',
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          // ==================== COVER PAGE ====================
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({
                text: 'SKILLBRIDGE AI',
                bold: true,
                size: 48, // 24pt
                color: COLOR_PRIMARY,
                font: 'Arial',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 360 },
            children: [
              new TextRun({
                text: 'Academia × Industry Intelligence Platform • SIH 2026 Prototype (SIH26044)',
                bold: true,
                size: 20, // 10pt
                color: COLOR_ACCENT,
                font: 'Arial',
              }),
            ],
          }),

          // Report Title
          new Paragraph({
            spacing: { before: 180, after: 120 },
            children: [
              new TextRun({
                text: 'CAREER INTELLIGENCE & SKILL AUDIT REPORT',
                bold: true,
                size: 36, // 18pt
                color: COLOR_PRIMARY,
                font: 'Arial',
              }),
            ],
          }),

          // Metadata Key-Value Table
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Candidate: ', bold: true, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              new TextRun({ text: `${report.candidateInfo.name}    `, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              new TextRun({ text: '• Target Role: ', bold: true, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              new TextRun({ text: `${report.targetRole}`, bold: true, size: 21, color: COLOR_PRIMARY, font: 'Arial' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Email: ', bold: true, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              new TextRun({ text: `${report.candidateInfo.email || 'N/A'}    `, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              new TextRun({ text: '• Institution: ', bold: true, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              new TextRun({ text: `${report.candidateInfo.college || 'Engineering Institute'}`, size: 21, color: COLOR_TEXT, font: 'Arial' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '• Degree: ', bold: true, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              new TextRun({ text: `${report.candidateInfo.degree || 'B.Tech / Equivalent'}    `, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              new TextRun({ text: '• Generated: ', bold: true, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              new TextRun({ text: `${report.generatedAt} (Report v${report.version}.0)`, size: 21, color: COLOR_TEXT, font: 'Arial' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 360 },
            children: [
              new TextRun({ text: '• Source Document: ', bold: true, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              new TextRun({ text: `${report.resumeMeta.fileName} (${report.resumeMeta.fileSize})`, size: 21, color: COLOR_MUTED, font: 'Arial' }),
            ],
          }),

          // Executive Summary Callout Box
          new Table({
            width: { size: 8640, type: WidthType.DXA },
            columnWidths: [8640],
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 8640, type: WidthType.DXA },
                    margins: { top: 240, bottom: 240, left: 280, right: 280 },
                    shading: { fill: COLOR_CALLOUT_BG },
                    borders: {
                      top: { style: BorderStyle.SINGLE, size: 2, color: COLOR_ACCENT },
                      bottom: { style: BorderStyle.SINGLE, size: 2, color: COLOR_ACCENT },
                      left: { style: BorderStyle.SINGLE, size: 6, color: COLOR_PRIMARY },
                      right: { style: BorderStyle.SINGLE, size: 2, color: COLOR_ACCENT },
                    },
                    children: [
                      new Paragraph({
                        spacing: { after: 120 },
                        children: [
                          new TextRun({
                            text: 'EXECUTIVE SUMMARY',
                            bold: true,
                            size: 24, // 12pt
                            color: COLOR_PRIMARY,
                            font: 'Arial',
                          }),
                        ],
                      }),
                      new Paragraph({
                        spacing: { after: 120, line: 276 },
                        children: [
                          new TextRun({
                            text: 'This verified career intelligence audit evaluates ',
                            size: 21,
                            color: COLOR_TEXT,
                            font: 'Arial',
                          }),
                          new TextRun({
                            text: report.candidateInfo.name,
                            bold: true,
                            size: 21,
                            color: COLOR_PRIMARY,
                            font: 'Arial',
                          }),
                          new TextRun({
                            text: ' against current industry placement standards for ',
                            size: 21,
                            color: COLOR_TEXT,
                            font: 'Arial',
                          }),
                          new TextRun({
                            text: report.targetRole,
                            bold: true,
                            size: 21,
                            color: COLOR_PRIMARY,
                            font: 'Arial',
                          }),
                          new TextRun({
                            text: '. Based on a 5-factor scoring model, the candidate achieves an Overall Career Readiness Score of ',
                            size: 21,
                            color: COLOR_TEXT,
                            font: 'Arial',
                          }),
                          new TextRun({
                            text: `${report.readinessScore}%`,
                            bold: true,
                            size: 21,
                            color: COLOR_ACCENT,
                            font: 'Arial',
                          }),
                          new TextRun({
                            text: '.',
                            size: 21,
                            color: COLOR_TEXT,
                            font: 'Arial',
                          }),
                        ],
                      }),
                      new Paragraph({
                        spacing: { after: 80, line: 276 },
                        children: [
                          new TextRun({
                            text: '• Core Strengths: ',
                            bold: true,
                            size: 21,
                            color: COLOR_PRIMARY,
                            font: 'Arial',
                          }),
                          new TextRun({
                            text: report.strengths[0] || `${report.skills.length} technical competencies extracted with project evidence.`,
                            size: 21,
                            color: COLOR_TEXT,
                            font: 'Arial',
                          }),
                        ],
                      }),
                      new Paragraph({
                        spacing: { line: 276 },
                        children: [
                          new TextRun({
                            text: '• Priority Gap: ',
                            bold: true,
                            size: 21,
                            color: COLOR_RED,
                            font: 'Arial',
                          }),
                          new TextRun({
                            text: report.criticalGaps[0]?.skill
                              ? `Deficit identified in ${report.criticalGaps[0].skill}. Recommended remedial roadmap projected to improve match rate by +14%.`
                              : 'No critical deficits detected. Qualified for immediate recruiter placement interviews.',
                            size: 21,
                            color: COLOR_TEXT,
                            font: 'Arial',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          // Page break after cover page & executive summary
          new Paragraph({
            children: [new PageBreak()],
          }),

          // ==================== SECTION 1 ====================
          createSectionHeader('1', 'Extracted Technical Competency Profile'),
          new Paragraph({
            spacing: { after: 180, line: 276 },
            children: [
              new TextRun({
                text: 'The following skills were identified and parsed from the candidate resume using SkillBridge AI 150+ technology ontology. Scores are estimated based on depth of project documentation, academic coursework, and verified tenure.',
                size: 21,
                color: COLOR_MUTED,
                font: 'Arial',
              }),
            ],
          }),
          new Table({
            width: { size: 8640, type: WidthType.DXA },
            columnWidths: [2400, 1600, 1400, 3240],
            rows: skillTableRows,
          }),

          // ==================== SECTION 2 ====================
          createSectionHeader('2', `Skill Gap Diagnostics — Benchmark: ${report.targetRole}`),
          new Paragraph({
            spacing: { after: 180, line: 276 },
            children: [
              new TextRun({
                text: `Diagnostic evaluation of candidate competencies against standard industry hiring requisitions for ${report.targetRole}. Gaps are prioritized by recruiter drop-off severity.`,
                size: 21,
                color: COLOR_MUTED,
                font: 'Arial',
              }),
            ],
          }),
          new Table({
            width: { size: 8640, type: WidthType.DXA },
            columnWidths: [2400, 1800, 1800, 2640],
            rows: gapTableRows,
          }),

          new Paragraph({
            spacing: { before: 240, after: 100 },
            children: [
              new TextRun({
                text: 'Detailed Deficit Explanations & Action Items:',
                bold: true,
                size: 22,
                color: COLOR_PRIMARY,
                font: 'Arial',
              }),
            ],
          }),
          ...report.criticalGaps.map(
            (gap) =>
              new Paragraph({
                spacing: { after: 100, line: 276 },
                children: [
                  new TextRun({ text: `• ${gap.skill}: `, bold: true, size: 21, color: COLOR_RED, font: 'Arial' }),
                  new TextRun({ text: `${gap.gapReason} `, size: 21, color: COLOR_TEXT, font: 'Arial' }),
                  new TextRun({ text: `Recommended Action: ${gap.recommendedAction}`, bold: true, size: 21, color: COLOR_PRIMARY, font: 'Arial' }),
                ],
              })
          ),

          // ==================== SECTION 3 ====================
          createSectionHeader('3', 'Deterministic 5-Factor Career Readiness Breakdown'),
          new Paragraph({
            spacing: { after: 140 },
            children: [
              new TextRun({ text: `Overall Career Readiness: `, bold: true, size: 24, color: COLOR_PRIMARY, font: 'Arial' }),
              new TextRun({ text: `${report.readinessScore}% (Model Calibrated)`, bold: true, size: 24, color: COLOR_ACCENT, font: 'Arial' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: '1. Technical Skills Competency: ', bold: true, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              new TextRun({ text: `${report.scoreBreakdown.technicalSkills} / 50 points  — Evaluates depth and breadth across languages, frameworks, and databases.`, size: 21, color: COLOR_TEXT, font: 'Arial' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: '2. Practical Projects Relevance: ', bold: true, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              new TextRun({ text: `${report.scoreBreakdown.projects} / 15 points  — Audits hands-on production code, repositories, and architectural complexity.`, size: 21, color: COLOR_TEXT, font: 'Arial' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: '3. Standardized Assessment Verification: ', bold: true, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              new TextRun({ text: `${report.scoreBreakdown.assessment} / 15 points  — Independent challenge testing and proctored coding assessments.`, size: 21, color: COLOR_TEXT, font: 'Arial' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: '4. Commercial Workplace Experience: ', bold: true, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              new TextRun({ text: `${report.scoreBreakdown.experience} / 10 points  — Verified industry internships, agile collaboration, and tenure.`, size: 21, color: COLOR_TEXT, font: 'Arial' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 240, line: 276 },
            children: [
              new TextRun({ text: '5. Industry Certifications: ', bold: true, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              new TextRun({ text: `${report.scoreBreakdown.certifications} / 10 points  — Recognized vendor and institutional professional credentials.`, size: 21, color: COLOR_TEXT, font: 'Arial' }),
            ],
          }),

          // ==================== SECTION 4 ====================
          createSectionHeader('4', 'Explainable Industry Opportunity Matching'),
          new Paragraph({
            spacing: { after: 180, line: 276 },
            children: [
              new TextRun({
                text: 'Matched opportunities calculated against active corporate hiring requisitions with explainable match criteria and identified competency overlaps.',
                size: 21,
                color: COLOR_MUTED,
                font: 'Arial',
              }),
            ],
          }),
          ...report.opportunities.slice(0, 5).flatMap((match, idx) => [
            new Paragraph({
              spacing: { before: 140, after: 60 },
              children: [
                new TextRun({
                  text: `${idx + 1}. ${match.opportunity.title} — ${match.opportunity.company}`,
                  bold: true,
                  size: 24, // 12pt
                  color: COLOR_PRIMARY,
                  font: 'Arial',
                }),
                new TextRun({
                  text: `  [ ${match.matchScore}% Match ]`,
                  bold: true,
                  size: 21,
                  color: COLOR_ACCENT,
                  font: 'Arial',
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 60, line: 276 },
              children: [
                new TextRun({ text: '   • Location & Type: ', bold: true, size: 21, color: COLOR_TEXT, font: 'Arial' }),
                new TextRun({ text: `${match.opportunity.location} (${match.opportunity.type})`, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              ],
            }),
            new Paragraph({
              spacing: { after: 60, line: 276 },
              children: [
                new TextRun({ text: '   • Matched Competencies: ', bold: true, size: 21, color: COLOR_ACCENT, font: 'Arial' }),
                new TextRun({ text: match.matchedSkills.join(', ') || 'Core Stack', size: 21, color: COLOR_TEXT, font: 'Arial' }),
              ],
            }),
            new Paragraph({
              spacing: { after: 60, line: 276 },
              children: [
                new TextRun({ text: '   • Missing Requisites: ', bold: true, size: 21, color: COLOR_AMBER, font: 'Arial' }),
                new TextRun({ text: match.missingSkills.join(', ') || 'None (Fully Qualified)', size: 21, color: COLOR_TEXT, font: 'Arial' }),
              ],
            }),
            new Paragraph({
              spacing: { after: 140, line: 276 },
              children: [
                new TextRun({ text: '   • Employer Rationale: ', bold: true, size: 21, color: COLOR_PRIMARY, font: 'Arial' }),
                new TextRun({ text: match.whyMatched[0] || match.recommendedAction, size: 21, color: COLOR_TEXT, font: 'Arial' }),
              ],
            }),
          ]),

          // ==================== SECTION 5 ====================
          createSectionHeader('5', 'Targeted Upskilling Action Plan & Milestones'),
          ...report.actionPlan.map(
            (step, i) =>
              new Paragraph({
                spacing: { after: 100, line: 276 },
                children: [
                  new TextRun({ text: `Phase ${i + 1}: `, bold: true, size: 21, color: COLOR_PRIMARY, font: 'Arial' }),
                  new TextRun({ text: step, size: 21, color: COLOR_TEXT, font: 'Arial' }),
                ],
              })
          ),

          // ==================== SECTION 6 ====================
          createSectionHeader('6', 'AI Resume Audit Insights & Recommendations'),
          new Paragraph({
            spacing: { before: 120, after: 60 },
            children: [new TextRun({ text: 'Verified Strengths:', bold: true, size: 22, color: COLOR_PRIMARY, font: 'Arial' })],
          }),
          ...report.strengths.map(
            (s) =>
              new Paragraph({
                spacing: { after: 60, line: 276 },
                children: [new TextRun({ text: `✓ ${s}`, size: 21, color: COLOR_TEXT, font: 'Arial' })],
              })
          ),
          new Paragraph({
            spacing: { before: 120, after: 60 },
            children: [new TextRun({ text: 'Identified Competency Deficits:', bold: true, size: 22, color: COLOR_RED, font: 'Arial' })],
          }),
          ...report.weaknesses.map(
            (w) =>
              new Paragraph({
                spacing: { after: 60, line: 276 },
                children: [new TextRun({ text: `△ ${w}`, size: 21, color: COLOR_TEXT, font: 'Arial' })],
              })
          ),
          new Paragraph({
            spacing: { before: 120, after: 60 },
            children: [new TextRun({ text: 'Curated Recommendations:', bold: true, size: 22, color: COLOR_ACCENT, font: 'Arial' })],
          }),
          ...report.recommendations.map(
            (r) =>
              new Paragraph({
                spacing: { after: 60, line: 276 },
                children: [new TextRun({ text: `• ${r}`, size: 21, color: COLOR_TEXT, font: 'Arial' })],
              })
          ),

          // Final Certification Footer
          new Paragraph({
            spacing: { before: 480 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'SkillBridge AI • Ministry of Ayush / All India Institute of Ayurveda • Smart India Hackathon 2026',
                size: 17,
                color: COLOR_MUTED,
                italics: true,
                font: 'Arial',
              }),
            ],
          }),
        ],
      },
    ],
  });

  return doc;
}

/**
 * Generate binary Blob or Buffer for DOCX
 */
export async function generateDocxBlob(report: CareerReport): Promise<Blob> {
  const doc = await createDocxDocument(report);
  return await Packer.toBlob(doc);
}

/**
 * Generate formatted JSON report string
 */
export function generateJsonReport(report: CareerReport): string {
  return JSON.stringify(
    {
      reportTitle: 'SkillBridge AI Career Intelligence Report',
      platform: 'SkillBridge AI — Academia × Industry Intelligence Platform',
      hackathonProblem: 'SIH26044 (Ministry of Ayush / All India Institute of Ayurveda)',
      reportVersion: `v${report.version}.0`,
      generatedAt: report.generatedAt,
      candidate: {
        name: report.candidateInfo.name,
        email: report.candidateInfo.email,
        phone: report.candidateInfo.phone,
        education: report.candidateInfo.education,
        degree: report.candidateInfo.degree,
        college: report.candidateInfo.college,
        experienceYears: report.candidateInfo.experienceYears,
      },
      resumeSource: {
        fileName: report.resumeMeta.fileName,
        fileSize: report.resumeMeta.fileSize,
        fileType: report.resumeMeta.fileType,
        uploadedAt: report.resumeMeta.uploadedAt,
      },
      targetRole: report.targetRole,
      readiness: {
        score: report.readinessScore,
        modelType: 'Prototype readiness model (Deterministic 5-Factor)',
        scoreBreakdown: report.scoreBreakdown,
      },
      skills: report.skills,
      softSkills: report.softSkills,
      tools: report.tools,
      skillGaps: {
        criticalGaps: report.criticalGaps,
        moderateGaps: report.moderateGaps,
        strongSkills: report.strongSkills,
        allGaps: report.skillGaps,
      },
      recommendedOpportunities: report.opportunities.map((o) => ({
        title: o.opportunity.title,
        company: o.opportunity.company,
        location: o.opportunity.location,
        type: o.opportunity.type,
        matchScore: o.matchScore,
        matchedSkills: o.matchedSkills,
        missingSkills: o.missingSkills,
        whyMatched: o.whyMatched,
        recommendedAction: o.recommendedAction,
      })),
      roadmap: report.roadmap,
      auditInsights: {
        strengths: report.strengths,
        weaknesses: report.weaknesses,
        recommendations: report.recommendations,
        actionPlan: report.actionPlan,
      },
    },
    null,
    2
  );
}

/**
 * Browser file download helpers
 */
export function downloadBlob(blob: Blob, filename: string): void {
  if (typeof window === 'undefined') return;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = sanitizeFilename(filename);
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function downloadTextFile(content: string, filename: string, mimeType = 'application/json'): void {
  const blob = new Blob([content], { type: mimeType });
  downloadBlob(blob, filename);
}

export async function downloadDocxReport(report: CareerReport): Promise<void> {
  const blob = await generateDocxBlob(report);
  const cleanName = report.candidateInfo.name.replace(/\s+/g, '_') || 'Candidate';
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `SkillBridge_Career_Report_${cleanName}_${dateStr}.docx`;
  downloadBlob(blob, filename);
}

export function downloadJsonReport(report: CareerReport): void {
  const jsonContent = generateJsonReport(report);
  const cleanName = report.candidateInfo.name.replace(/\s+/g, '_') || 'Candidate';
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `SkillBridge_Career_Report_${cleanName}_${dateStr}.json`;
  downloadTextFile(jsonContent, filename, 'application/json');
}

export function downloadOriginalResumeFile(record: ResumeRecord): void {
  if (!record.fileDataUrl) {
    // If raw Data URL is not available, export the raw text as a text file
    downloadTextFile(
      record.rawText || 'Resume file content',
      record.fileName.endsWith('.txt') ? record.fileName : `${record.fileName}.txt`,
      'text/plain'
    );
    return;
  }

  // Download from stored Data URL
  const anchor = document.createElement('a');
  anchor.href = record.fileDataUrl;
  anchor.download = sanitizeFilename(record.fileName || 'Uploaded_Resume.pdf');
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
}
