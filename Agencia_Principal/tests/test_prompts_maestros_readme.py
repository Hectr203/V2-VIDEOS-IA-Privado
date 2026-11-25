"""Los 3 Prompts Maestros y el Banco de Preguntas deben estar documentados en el README principal."""
import re
import unittest
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
README = (RAIZ / 'README.md').read_text(encoding='utf-8')
ASISTENTE = (RAIZ / 'Agencia_Principal/asistente-principal.md').read_text(encoding='utf-8')
INDICE = (RAIZ / 'Agencia_Principal/PROMPTS-MAESTROS.md').read_text(encoding='utf-8')


class PromptsMaestrosEnReadmeTests(unittest.TestCase):
    def test_readme_contiene_los_tres_prompts_en_bloques_copiables(self):
        for modo in ('MODO 1 · IDEAS', 'MODO 2 · PRODUCCIÓN GUIADA', 'MODO 3 · PILOTO AUTOMÁTICO'):
            self.assertIn(modo, README)
        self.assertGreaterEqual(README.count('```text'), 4)  # 3 prompts + ejemplo de chat/diagrama

    def test_readme_contiene_banco_de_preguntas_completo(self):
        for pid in ('I1', 'I2', 'I3', 'A1', 'A2', 'A3', 'A3a', 'A3b', 'A3c', 'A4', 'A5', 'A6', 'B-2D', 'B-3D', 'C1', 'C2'):
            self.assertRegex(README, rf'\*\*{re.escape(pid)}\*\*', pid)
        self.assertIn('elevenlabs_cli.py modelos', README)
        self.assertIn('SOYHLrjzK2X1ezoPC6cr', README)
        self.assertIn('Applio', README)
        self.assertIn('[MULTI]', README)

    def test_readme_exige_miniatura_por_formato(self):
        self.assertIn('miniatura-vertical.png', README)
        self.assertIn('miniatura-horizontal.png', README)

    def test_asistente_e_indice_apuntan_al_readme_sin_duplicar_preguntas(self):
        self.assertIn('../README.md', ASISTENTE)
        self.assertIn('../README.md', INDICE)
        self.assertNotIn('**Pregunta 1 (OBLIGATORIA EN PRIMER LUGAR', ASISTENTE)
        self.assertNotIn('```text', INDICE)

    def test_scripts_de_miniatura_y_modelos_existen(self):
        self.assertIn('--thumbnail', (RAIZ / 'video-studio-2d/scripts/crear_produccion_2d.py').read_text(encoding='utf-8'))
        self.assertIn('--thumbnail', (RAIZ / 'video-studio-3d/scripts/crear_produccion_3d.py').read_text(encoding='utf-8'))
        self.assertIn('cmd_modelos', (RAIZ / 'video-studio-2d/scripts/elevenlabs_cli.py').read_text(encoding='utf-8'))
        self.assertEqual(
            (RAIZ / 'video-studio-2d/scripts/elevenlabs_cli.py').read_text(encoding='utf-8'),
            (RAIZ / 'video-studio-3d/scripts/elevenlabs_cli.py').read_text(encoding='utf-8'),
        )


if __name__ == '__main__':
    unittest.main()
