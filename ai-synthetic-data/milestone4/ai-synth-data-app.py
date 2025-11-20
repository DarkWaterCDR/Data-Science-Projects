import os
import re
import json
from dotenv import load_dotenv
import streamlit as st
from openai import OpenAI

# Load environment variables from .env
load_dotenv()

# Retrieve OpenAI API key
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    st.error("OPENAI_API_KEY not found in environment; please check your .env file.")
    st.stop()

# Initialize the new OpenAI v1 client
client = OpenAI(api_key=api_key)

# Page configuration
st.set_page_config(page_title="Auto Insurance Synthetic Data Generator", layout="wide")

st.title("Auto Insurance Synthetic Data Generator")
st.write(
    "Describe the policy data you need below and click 'Generate Data' button to obtain your synthetic data."
)

# User inputs
scenario = st.text_area(
    "Scenario Prompt",
    value="Generate a policy with a 16-year-old driver who has 1 at-fault accidents."
)
num_policies = st.slider("Number of Policies", min_value=1, max_value=20, value=1)
generate = st.button("Generate Data")

def extract_json_array(raw_text: str) -> str:
    """
    This function will remove markdown fences returned from the model and extract the JSON array block.
    """
    # Strip code fences
    text = re.sub(r"```(?:json)?\s*", "", raw_text)
    text = re.sub(r"\s*```", "", text)
    # Extract JSON array
    match = re.search(r"(\[.*\])", text, re.DOTALL)
    if not match:
        raise ValueError("No JSON array found in the model output.")
    return match.group(1)

if generate:
    with st.spinner("Generating synthetic data..."):
        prompt = f"{scenario}\n\nReturn ONLY the JSON array of {num_policies} policies."
        response = client.chat.completions.create(
            model="ft:gpt-4o-mini-2024-07-18:darkwatercdr:dsc670-week09-pricing-ft:BWFyEa5u",
            messages=[
                {"role": "system", "content": "You are a JSON-only data generator for auto insurance policies."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2,
            top_p=1.0
        )
        raw_output = response.choices[0].message.content

        try:
            json_text = extract_json_array(raw_output)
            data = json.loads(json_text)
            
            st.subheader("Generated Policies JSON")
            st.json(data)
            
            st.download_button(
                label="Download JSON",
                data=json.dumps(data, indent=2),
                file_name="synthetic_policies.json",
                mime="application/json"
            )

        except Exception as e:
            st.error(f"Failed to parse JSON: {e}")
            st.code(raw_output, language="text")