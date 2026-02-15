import type {  IAuthenticateGeneric, Icon, ICredentialTestRequest, ICredentialType, INodeProperties } from "n8n-workflow";

export class WakeCommerceApi  implements ICredentialType {
    name = 'wakeCommerceApi';
    displayName = 'Wake Commerce API'
    documentationUrl = "https://wakecommerce.readme.io/docs/autenticacao-e-criacao-do-token"
    icon: Icon = {
        light: 'file:../icons/wake-commerce-preto.svg',
        dark: 'file:../icons/wake-commerce-branco.svg'
    }
    properties: INodeProperties[] = [
        {
            displayName: 'Token',
            name: 'token',
            type: 'string',
            typeOptions: {
                password: true
            },
            default: ''
        }
    ]

    authenticate?: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                Authorization: '=Basic {{$credentials?.token}}'
            }
        }
    }
    test: ICredentialTestRequest = {
        request: {
            baseURL: 'https://api.fbits.net',
            url: '/loja',
            method: 'GET'
        }
    }
}