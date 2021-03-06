package pl.warapp.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import pl.warapp.exception.MyFileNotFoundException;
import pl.warapp.model.Category;
import pl.warapp.model.Producer;
import pl.warapp.model.Product;
import pl.warapp.payload.UploadFileResponse;
import pl.warapp.repository.CategoryRepository;
import pl.warapp.repository.ProducerRepository;
import pl.warapp.repository.ProductRepository;
import pl.warapp.service.ProducerFileStorageService;

@RestController
public class AssortmentController {
	
	private static final Logger logger = LoggerFactory.getLogger(AssortmentController.class);
	
	@Autowired
	CategoryRepository categoryRepository;
	@Autowired
	ProductRepository productRepository;
	@Autowired
	ProducerRepository producerRepository;
    @Autowired
    private ProducerFileStorageService ProducerFileStorageService;

    @PostMapping("/uploadFile")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("name") String name) {
    	System.out.println(name);
        Producer producer = ProducerFileStorageService.storeFile(file, name);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(producer.getId())
                .toUriString();

        return new UploadFileResponse( producer.getFileName(), fileDownloadUri,
                file.getContentType(), file.getSize());
    }

	
	
	
	
	@PostMapping("/category")
	public ResponseEntity<?> save(@RequestBody Category category){
		if(category.getId() == null) {
			
			categoryRepository.save(category);

			return ResponseEntity.ok(null);
		}else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } 
		
		
	}
	
	@PostMapping("/product")
	public ResponseEntity<?> save(@RequestBody Product product){
		if(product.getId() == null) {
			
			product.getProducer();
			product.getCategory();
			System.out.println(product.getProducer());
			System.out.println(product.getCategory());
			
			productRepository.save(product);

			return ResponseEntity.ok(null);
		}else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } 
		
		
	}
	
	
	@GetMapping("/category")
	public List<Category> getAllCategory() {
		return categoryRepository.findAll();
	}
	
	
	@GetMapping("/product")
	public List<Product> getAllProduct() {
		return productRepository.findAll();
	}
	
	@GetMapping("/downloadFile/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) {
        // Load file from database
        Producer producer = ProducerFileStorageService.getFile(fileId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(producer.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + producer.getFileName() + "\"")
                .body(new ByteArrayResource(producer.getData()));
    }
	
	@GetMapping("/downloadFile")
	public List<Producer> getFile() {       
        return producerRepository.findAll();
    }
	
	
	


}
