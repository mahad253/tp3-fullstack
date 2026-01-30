package fr.fullstack.shopapp.util;

import fr.fullstack.shopapp.service.ElasticSearchService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class ElasticStartupLoader implements ApplicationRunner {

    private final ElasticSearchService indexService;

    @Value("${elasticsearch.reindex-on-startup:true}")
    private boolean shouldReindex;

    public ElasticStartupLoader(ElasticSearchService indexService) {
        this.indexService = indexService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (shouldReindex) {
            System.out.println("=== ELASTIC REINDEX ===");
            indexService.reindexAll();
        }
    }
}
