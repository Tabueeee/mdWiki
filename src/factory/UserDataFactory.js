const glob = require('util').promisify(require('glob'));
const path = require('path');
const fs = require('fs');

var NavDataFactory = function (basePath) {

    function createCategories(filePath) {

        let [category1, category2, ...restCategories] = filePath.split(path.sep);

        if (restCategories.length === 0 && typeof category2 === 'string') {
            restCategories = [category2];
            category2 = '\/';
        }

        if (typeof category2 !== 'string') {
            restCategories = [category1];
            category2 = '.';
            category1 = '\/';
        }

        return {
            category: category1,
            subcategory: category2,
            topic: restCategories.join('.').replace('.md', ''),
        }
    }

    function getNavigationData(relativeFilePath) {
        return {
            url: '/' + relativeFilePath.split(path.sep).join('/').replace('.md', '.html'),
            filePath: relativeFilePath,
            ...createCategories(relativeFilePath)
        }
    }

    async function contentDataFactory() {
        let files = await glob(basePath + '/**/*.md');
        let i = 0;
        let contents = files.map((file) => {
            let relativeFilePath = path.resolve(file);
            relativeFilePath = relativeFilePath.replace(basePath, '');

            return {
                body: fs.readFileSync(file, 'utf8'),
                title: path.parse(file).name,
                id: i++,
                ...getNavigationData(relativeFilePath)
            };
        });

        return contents;
    }

    return {
        getContentData: contentDataFactory,
        'createNavData': async function () {
            let files = await glob(basePath + '/**/*.md');

            return files.map((file) => {
                let relativeFilePath = path.resolve(file);
                relativeFilePath = relativeFilePath.replace(basePath, '');

                return getNavigationData(relativeFilePath);
            });
        }
    };
};

module.exports = NavDataFactory;
