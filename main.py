import argparse
import logging
import os
import sys

# Set up logging configuration
logging.basicConfig(
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    level=logging.INFO,
)

def parse_arguments():
    parser = argparse.ArgumentParser(description="DevOps Scripts")
    parser.add_argument(
        "-v", "--verbose", action="store_true", help="Increase verbosity"
    )
    return parser.parse_args()

def main():
    args = parse_arguments()
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)

    try:
        # Add script logic here
        logging.info("Script started")
        # Example logic: list files in current directory
        files = [f for f in os.listdir(".") if os.path.isfile(f)]
        logging.debug("Files in current directory: %s", files)
        logging.info("Script completed successfully")
    except Exception as e:
        logging.error("Script failed with error: %s", str(e))
        sys.exit(1)

if __name__ == "__main__":
    main()