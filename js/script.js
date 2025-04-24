/*
  Copyright (c) 2025 Litygames
  Licensed under the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.txt
*/

// #BOTON GENERAR MACRO#
// Configuración
const MAX_INPUT_LENGTH = 10000;
const functionStartRegex = /^(?:private\s+)?(?:sub|function)/i;

const generateBtn = document.getElementById('generateBtn');
const copyBtn     = document.getElementById('copyButton');
const inputEl     = document.getElementById('vbaCodeInput');
const outputEl    = document.getElementById('generatedCode');
const copyStatus  = document.getElementById('copyStatus');

// Limita el tamaño del textarea
inputEl?.setAttribute('maxlength', MAX_INPUT_LENGTH);

// Asigna los listeners de forma externa
generateBtn?.addEventListener('click', generateMacro);
copyBtn?.addEventListener('click', copyToClipboard);

async function generateMacro() {
  if (!generateBtn) return;
  generateBtn.disabled = true;  // previene clicks repetidos
  try {
    const onlyInsert   = !!document.getElementById("OnlyInsertLines")?.checked;
    const ignoreBlocks = !!document.getElementById("IgnoreSubFunctionBlocks")?.checked;
    const input = inputEl?.value || '';

    // Valida longitud
    if (input.length > MAX_INPUT_LENGTH) {
      alert(`El código no puede exceder ${MAX_INPUT_LENGTH} caracteres.`);
      return;
    }

    const lines = input.split('\n');
    let result = '';

    if (!onlyInsert) {
      result += createInitialCode();
    }

    const maxLines = 24;
    let block = [];

    const flushBlock = () => {
      if (!block.length) return;
      result += "    lineNumber = .CountOfLines + 1\n";
      result += "    .InsertLines lineNumber, _\n";
      result += block.map((l, i) => formatLine(l, i, block.length)).join('');
      block = [];
    };

    lines.forEach(line => {
      const trimmed = line.trim();
      const isStart = !ignoreBlocks && functionStartRegex.test(trimmed);
      if ((isStart && block.length) || block.length === maxLines) {
        flushBlock();
      }
      block.push(line);
    });
    flushBlock();

    if (!onlyInsert) {
      result += "  End With\nEnd Sub";
    }

    outputEl.value = result;  // asignación segura

  } catch (e) {
    console.error(e);
    alert('Ocurrió un error al generar la macro.');
  } finally {
    generateBtn.disabled = false;
  }
}

function createInitialCode() {
  return `
Sub InsertModule()
  Dim pptVBProject As Object, pptVBComponent As Object, lineNumber As Long
  Dim moduleName As String: moduleName = "GeneratedModule"
  Set pptVBProject = ActivePresentation.VBProject
  On Error Resume Next
  Set pptVBComponent = pptVBProject.VBComponents(moduleName)
  On Error GoTo 0
  If Not pptVBComponent Is Nothing Then
    MsgBox "El módulo '" & moduleName & "' ya existe.", vbInformation: Exit Sub
  End If
  Set pptVBComponent = pptVBProject.VBComponents.Add(1)
  pptVBComponent.Name = moduleName
  With pptVBComponent.CodeModule
`.trim() + "\n";
}

function formatLine(line, idx, total) {
  const escaped = line.replace(/"/g, '""');
  return `      "${escaped}"${idx < total - 1 ? ' & vbCrLf & _' : ''}\n`;
}

// #BOTON COPIAR CODIGO#
async function copyToClipboard() {
  if (!copyBtn) return;
  copyBtn.disabled = true;
  try {
    await navigator.clipboard.writeText(outputEl.value);
    copyStatus.textContent = "Code copied!";
    setTimeout(() => copyStatus.textContent = "", 1000);
  } catch (e) {
    console.error(e);
    alert("No se pudo copiar al portapapeles.");
  } finally {
    copyBtn.disabled = false;
  }
}
