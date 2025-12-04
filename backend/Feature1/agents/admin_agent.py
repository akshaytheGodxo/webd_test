from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
import os

MODEL = "gpt-4o-mini"
OPENAI_KEY = "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"

llm = ChatOpenAI(model=MODEL, api_key=OPENAI_KEY, temperature=0)

def build_admin_alert(response_text: str, classification_text: str, authenticity_text: str) -> str:
    prompt = f"""
You are an Admin Alert Generator.

INPUT:
RESPONSE:
{response_text}

CLASSIFICATION:
{classification_text}

AUTHENTICITY:
{authenticity_text}

TASK:
If notify_admin is true:
    admin_alert: <short alert>
    priority: high
    send_dashboard_alert: true

Else:
    admin_alert: none
    priority: none
    send_dashboard_alert: false

OUTPUT FORMAT:
admin_alert: <text>
priority: <value>
send_dashboard_alert: <true|false>
"""
    resp = llm.invoke([HumanMessage(content=prompt)])
    return resp.content.strip()
