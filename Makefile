# SPDX-License-Identifier: Apache-2.0 OR MIT
# oxmllib.com — Static documentation site compiled with ssg (Lucid theme)

.PHONY: all build clean serve check audit

all: build

build:
	@command -v ssg >/dev/null || { echo "ssg is required: cargo install ssg"; exit 1; }
	@rm -rf public
	ssg build -f ssg.toml
	@# Copy layout assets, images, and CNAME into public/
	@mkdir -p public/images public/assets
	@cp -f images/*.webp images/*.png public/images/ 2>/dev/null || true
	@cp -f _layouts/assets/* public/assets/ 2>/dev/null || true
	@cp -f _layouts/favicon.ico public/favicon.ico 2>/dev/null || true
	@cp -f CNAME public/CNAME
	@cp -f public/404/index.html public/404.html 2>/dev/null || true
	@touch public/.nojekyll
	@# Publish highlight.css at root
	@hl=$$(find public -maxdepth 2 -name 'highlight.*.css' -print -quit); [ -n "$$hl" ] && cp -f "$$hl" public/highlight.css || true

serve: build
	ssg dev --config ssg.toml

check: build
	ssg check --config ssg.toml

clean:
	@rm -rf public *.log
