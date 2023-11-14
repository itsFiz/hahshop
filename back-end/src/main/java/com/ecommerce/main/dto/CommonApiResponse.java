package com.ecommerce.main.Dto;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonApiResponse {

    private String responseMessage;

    private boolean isSuccess;

}
