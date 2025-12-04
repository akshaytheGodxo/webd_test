from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
import os

MODEL = "gpt-4o-mini"
OPENAI_KEY = "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"

llm = ChatOpenAI(model=MODEL, api_key=OPENAI_KEY, temperature=0)

def check_misinformation(classification_text: str) -> str:
    prompt = f"""
You are a Misinformation Detection Agent.

Given this classification:

{classification_text}

TASK:
- authenticity: likely_real, unclear, likely_fake
- confidence: 0–1
- reasons:
  - reason 1
  - reason 2

OUTPUT FORMAT:
authenticity: <value>
confidence: <value>
reasons:
- <reason 1>
- <reason 2>
"""
    resp = llm.invoke([HumanMessage(content=prompt)])
    return resp.content.strip()
