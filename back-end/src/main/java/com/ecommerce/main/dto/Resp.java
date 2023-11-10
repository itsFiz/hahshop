package com.ecommerce.main.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Resp {
    private Integer status = 1;
    private Object body;

    public Resp (Integer status, Object body){
        this.status = status;
        this.body = body;
    }
}
