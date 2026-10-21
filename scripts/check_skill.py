#!/usr/bin/env python3
"""Lightweight packaging sanity check; does not prove agent execution."""
from pathlib import Path
import sys
root = Path(__file__).resolve().parents[1]
manifest = root / 'SKILL.md'
content = manifest.read_text(encoding='utf-8')
assert content.startswith('---\n')
header = content.split('---', 2)[1]
assert '\nname: design-to-production\n' in header
assert '\ndescription:' in header
for name in ['mapping-template.md','visual-verification.md','decision-policy.md']:
    assert (root / 'references' / name).is_file(), f'Missing: {name}'
    assert f'(references/{name})' in content
print('Skill structure OK:', root)
