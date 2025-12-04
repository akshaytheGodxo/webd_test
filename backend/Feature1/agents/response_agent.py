from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
import os

MODEL = "gpt-4o-mini"
OPENAI_KEY = "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"

llm = ChatOpenAI(model=MODEL, api_key=OPENAI_KEY, temperature=0)

def generate_response(classification_text: str, authenticity_text: str) -> str:
    prompt = f"""
You are a Disaster Response Agent.

INPUT:
CLASSIFICATION:
{classification_text}

AUTHENTICITY:
{authenticity_text}

TASK:
Return:
user_message: <message>
recommended_actions:
- action 1
- action 2
- action 3
notify_admin: <true|false>

RULE:
notify_admin = true when severity = high AND authenticity = likely_real
"""
    resp = llm.invoke([HumanMessage(content=prompt)])
    return resp.content.strip()
